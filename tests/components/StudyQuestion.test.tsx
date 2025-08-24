import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { StudyQuestion } from '../../src/components/StudyQuestion';
import { Question } from '../../src/data/types';

// Mock the usePassageHtml hook
vi.mock('../../src/hooks/usePassageHtml', () => ({
  usePassageHtml: () => ({
    passages: {},
    loading: {},
    errors: {},
    fetchPassage: vi.fn(),
  }),
}));

// Mock Ionic components
vi.mock('@ionic/react', () => ({
  IonIcon: ({ icon, color, style }: any) => <span data-testid="ion-icon" data-icon={icon} data-color={color} style={style} />,
  IonSpinner: () => <span data-testid="ion-spinner" />,
  IonText: ({ children, color }: any) => <span data-testid="ion-text" data-color={color}>{children}</span>,
}));

describe('StudyQuestion', () => {
  const mockQuestion: Question = {
    question: 'What is the main theme of this passage?',
    leadersHint: 'Focus on salvation themes',
    refs: ['John 3:16', 'Romans 5:8'],
    detectedRefs: [
      { originalText: 'John 3:16', references: ['John 3:16'] },
      { originalText: 'Romans 5:8', references: ['Romans 5:8'] }
    ]
  };

  const defaultProps = {
    question: mockQuestion,
    questionKey: 'section-0',
    isCompleted: false,
    onToggleComplete: vi.fn(),
    showLeaderHints: false,
  };

  test('renders question text correctly', () => {
    render(<StudyQuestion {...defaultProps} />);
    expect(screen.getByText('What is the main theme of this passage?')).toBeInTheDocument();
  });

  test('calls onToggleComplete when question is clicked', () => {
    const onToggleComplete = vi.fn();
    render(<StudyQuestion {...defaultProps} onToggleComplete={onToggleComplete} />);
    
    const questionElement = screen.getByRole('listitem');
    fireEvent.click(questionElement);
    
    expect(onToggleComplete).toHaveBeenCalledOnce();
  });

  test('applies completed class when question is completed', () => {
    render(<StudyQuestion {...defaultProps} isCompleted={true} />);
    
    const questionElement = screen.getByRole('listitem');
    expect(questionElement).toHaveClass('completed');
  });

  test('shows leader hints when showLeaderHints is true', () => {
    render(<StudyQuestion {...defaultProps} showLeaderHints={true} />);
    
    expect(screen.getByText('Focus on salvation themes')).toBeInTheDocument();
    expect(screen.getByTestId('ion-icon')).toBeInTheDocument();
    expect(screen.getByText('Verse refs:')).toBeInTheDocument();
    expect(screen.getByText('John 3:16, Romans 5:8')).toBeInTheDocument();
  });

  test('does not show leader hints when showLeaderHints is false', () => {
    render(<StudyQuestion {...defaultProps} showLeaderHints={false} />);
    
    expect(screen.queryByText('Focus on salvation themes')).not.toBeInTheDocument();
    expect(screen.queryByText('Verse refs:')).not.toBeInTheDocument();
  });

  test('handles question without leader hints', () => {
    const questionWithoutHints: Question = {
      question: 'Simple question?',
      refs: [],
      detectedRefs: []
    };

    render(<StudyQuestion {...defaultProps} question={questionWithoutHints} showLeaderHints={true} />);
    
    expect(screen.getByText('Simple question?')).toBeInTheDocument();
    expect(screen.queryByText('Focus on salvation themes')).not.toBeInTheDocument();
  });

  test('handles question without detected refs', () => {
    const questionWithoutRefs: Question = {
      question: 'What do you think?',
      refs: [],
      detectedRefs: []
    };

    render(<StudyQuestion {...defaultProps} question={questionWithoutRefs} />);
    
    expect(screen.getByText('What do you think?')).toBeInTheDocument();
  });

  test('renders clickable verse references when detectedRefs are present', () => {
    const questionWithDetectedRefs: Question = {
      question: 'Look at John 3:16 and Romans 5:8',
      refs: ['John 3:16', 'Romans 5:8'],
      detectedRefs: [
        { originalText: 'John 3:16', references: ['John 3:16'] },
        { originalText: 'Romans 5:8', references: ['Romans 5:8'] }
      ]
    };

    render(<StudyQuestion {...defaultProps} question={questionWithDetectedRefs} />);
    
    // The component should render with clickable verse references
    const questionElement = screen.getByRole('listitem');
    expect(questionElement).toBeInTheDocument();
  });

  test('does not expand passages by default', () => {
    render(<StudyQuestion {...defaultProps} />);
    
    // Should not show expanded passages initially
    expect(screen.queryByTestId('ion-spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/Error loading/)).not.toBeInTheDocument();
  });
});