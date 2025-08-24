import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { usePassageHtml } from '../../src/hooks/usePassageHtml';

// Mock the Crossway ESV API client
vi.mock('@christchurchmayfair/crossway-esv-api-client', () => {
  const mockV3PassageHtmlGet = vi.fn();
  const MockDefaultApi = vi.fn().mockImplementation(() => ({
    v3PassageHtmlGet: mockV3PassageHtmlGet,
  }));
  
  return {
    DefaultApi: MockDefaultApi,
  };
});

// Import the mocked module to get access to the mocks
import { DefaultApi } from '@christchurchmayfair/crossway-esv-api-client';
const mockDefaultApiInstance = new DefaultApi();
const mockV3PassageHtmlGet = mockDefaultApiInstance.v3PassageHtmlGet as any;

describe('usePassageHtml', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockV3PassageHtmlGet.mockClear();
  });

  test('initializes with empty state', () => {
    const { result } = renderHook(() => usePassageHtml());

    expect(result.current.passages).toEqual({});
    expect(result.current.loading).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(typeof result.current.fetchPassage).toBe('function');
  });

  test('successfully fetches passage HTML', async () => {
    const mockResponse = {
      data: {
        passages: ['<p>In the beginning God created the heavens and the earth.</p>']
      }
    };
    mockV3PassageHtmlGet.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePassageHtml());

    act(() => {
      result.current.fetchPassage('Genesis 1:1');
    });

    // Should set loading state immediately
    expect(result.current.loading['Genesis 1:1']).toBe(true);
    expect(result.current.errors['Genesis 1:1']).toBe(null);

    await waitFor(() => {
      expect(result.current.loading['Genesis 1:1']).toBe(false);
    });

    expect(result.current.passages['Genesis 1:1']).toBe('<p>In the beginning God created the heavens and the earth.</p>');
    expect(result.current.errors['Genesis 1:1']).toBe(null);
  });

  test('handles API errors gracefully', async () => {
    const mockError = new Error('Network error');
    mockV3PassageHtmlGet.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePassageHtml());

    act(() => {
      result.current.fetchPassage('John 3:16');
    });

    // Should set loading state immediately
    expect(result.current.loading['John 3:16']).toBe(true);

    await waitFor(() => {
      expect(result.current.loading['John 3:16']).toBe(false);
    });

    expect(result.current.passages['John 3:16']).toBeUndefined();
    expect(result.current.errors['John 3:16']).toBe('Network error');
  });

  test('handles API response with no passages', async () => {
    const mockResponse = {
      data: {
        passages: []
      }
    };
    mockV3PassageHtmlGet.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePassageHtml());

    act(() => {
      result.current.fetchPassage('Invalid 999:999');
    });

    await waitFor(() => {
      expect(result.current.loading['Invalid 999:999']).toBe(false);
    });

    expect(result.current.passages['Invalid 999:999']).toBeUndefined();
    expect(result.current.errors['Invalid 999:999']).toBe('No passages found');
  });

  test('handles non-Error objects in catch block', async () => {
    mockV3PassageHtmlGet.mockRejectedValue('String error');

    const { result } = renderHook(() => usePassageHtml());

    act(() => {
      result.current.fetchPassage('Romans 8:28');
    });

    await waitFor(() => {
      expect(result.current.loading['Romans 8:28']).toBe(false);
    });

    expect(result.current.errors['Romans 8:28']).toBe('Failed to load passage');
  });

  test('skips fetch if passage already loaded', async () => {
    const mockResponse = {
      data: {
        passages: ['<p>Test passage content</p>']
      }
    };
    mockV3PassageHtmlGet.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePassageHtml());

    // First fetch
    act(() => {
      result.current.fetchPassage('Psalm 23:1');
    });

    await waitFor(() => {
      expect(result.current.passages['Psalm 23:1']).toBe('<p>Test passage content</p>');
    });

    expect(mockV3PassageHtmlGet).toHaveBeenCalledTimes(1);

    // Second fetch of same passage should be skipped
    act(() => {
      result.current.fetchPassage('Psalm 23:1');
    });

    expect(mockV3PassageHtmlGet).toHaveBeenCalledTimes(1); // Still only called once
  });

  test('skips fetch if passage is currently loading', async () => {
    let resolvePromise: (value: any) => void;
    const delayedPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockV3PassageHtmlGet.mockReturnValue(delayedPromise);

    const { result } = renderHook(() => usePassageHtml());

    // Start first fetch
    act(() => {
      result.current.fetchPassage('Matthew 5:3-12');
    });

    expect(result.current.loading['Matthew 5:3-12']).toBe(true);

    // Try to fetch same passage while loading
    act(() => {
      result.current.fetchPassage('Matthew 5:3-12');
    });

    expect(mockV3PassageHtmlGet).toHaveBeenCalledTimes(1);

    // Resolve the promise to clean up
    act(() => {
      resolvePromise!({
        data: {
          passages: ['<p>Beatitudes content</p>']
        }
      });
    });
  });

  test('can fetch multiple different passages', async () => {
    const mockResponse1 = {
      data: {
        passages: ['<p>Genesis content</p>']
      }
    };
    const mockResponse2 = {
      data: {
        passages: ['<p>John content</p>']
      }
    };

    mockV3PassageHtmlGet
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const { result } = renderHook(() => usePassageHtml());

    // Fetch first passage
    act(() => {
      result.current.fetchPassage('Genesis 1:1');
    });

    await waitFor(() => {
      expect(result.current.passages['Genesis 1:1']).toBe('<p>Genesis content</p>');
    });

    // Fetch second passage
    act(() => {
      result.current.fetchPassage('John 1:1');
    });

    await waitFor(() => {
      expect(result.current.passages['John 1:1']).toBe('<p>John content</p>');
    });

    expect(mockV3PassageHtmlGet).toHaveBeenCalledTimes(2);
    expect(result.current.passages).toEqual({
      'Genesis 1:1': '<p>Genesis content</p>',
      'John 1:1': '<p>John content</p>'
    });
  });

  test('calls API with correct parameters', async () => {
    const mockResponse = {
      data: {
        passages: ['<p>Test content</p>']
      }
    };
    mockV3PassageHtmlGet.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePassageHtml());

    act(() => {
      result.current.fetchPassage('Ephesians 2:8-9');
    });

    await waitFor(() => {
      expect(result.current.passages['Ephesians 2:8-9']).toBe('<p>Test content</p>');
    });

    expect(DefaultApi).toHaveBeenCalledWith(
      undefined,
      'https://study.christchurchmayfair.org/esv'
    );

    expect(mockV3PassageHtmlGet).toHaveBeenCalledWith({
      q: 'Ephesians 2:8-9',
      includePassageReferences: false,
      includeAudioLink: false,
      includeCrossrefs: false,
      includeFootnotes: false,
      includeHeadings: false,
    });
  });

  test('clears error when starting new fetch', async () => {
    // First call fails
    mockV3PassageHtmlGet.mockRejectedValueOnce(new Error('First error'));

    const { result } = renderHook(() => usePassageHtml());

    act(() => {
      result.current.fetchPassage('Romans 3:23');
    });

    await waitFor(() => {
      expect(result.current.errors['Romans 3:23']).toBe('First error');
    });

    // Second call succeeds
    const mockResponse = {
      data: {
        passages: ['<p>Success content</p>']
      }
    };
    mockV3PassageHtmlGet.mockResolvedValue(mockResponse);

    act(() => {
      result.current.fetchPassage('Romans 6:23');
    });

    // Error should be cleared for the new reference
    expect(result.current.errors['Romans 6:23']).toBe(null);

    await waitFor(() => {
      expect(result.current.passages['Romans 6:23']).toBe('<p>Success content</p>');
    });

    expect(result.current.errors['Romans 6:23']).toBe(null);
  });
});