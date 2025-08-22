import { DefaultApi } from "@christchurchmayfair/crossway-esv-api-client";
import { useState, useCallback } from "react";

type PassageHtmlState = {
  [reference: string]: string;
};

type LoadingState = {
  [reference: string]: boolean;
};

type ErrorState = {
  [reference: string]: string | null;
};

export function usePassageHtml() {
  const [passages, setPassages] = useState<PassageHtmlState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [errors, setErrors] = useState<ErrorState>({});

  const fetchPassage = useCallback(async (reference: string) => {
    // Skip if already loaded or loading
    if (passages[reference] || loading[reference]) {
      return;
    }

    // Set loading state
    setLoading(prev => ({ ...prev, [reference]: true }));
    setErrors(prev => ({ ...prev, [reference]: null }));

    try {
      // Reuse the exact same API pattern from BiblePassage.tsx
      const crossway = new DefaultApi(
        undefined,
        "https://study.christchurchmayfair.org/esv"
      );

      const response = await crossway.v3PassageHtmlGet({
        q: reference,
        includePassageReferences: false, // Don't include the reference heading
        includeAudioLink: false,
        includeCrossrefs: false,
        includeFootnotes: false,
        includeHeadings: false,
      });

      if (response.data.passages && response.data.passages.length > 0) {
        setPassages(prev => ({
          ...prev,
          [reference]: response.data.passages![0]
        }));
      } else {
        throw new Error("No passages found");
      }
    } catch (error) {
      console.error("Failed to fetch passage:", reference, error);
      setErrors(prev => ({
        ...prev,
        [reference]: error instanceof Error ? error.message : "Failed to load passage"
      }));
    } finally {
      setLoading(prev => ({ ...prev, [reference]: false }));
    }
  }, [passages, loading]);

  return {
    passages,
    loading,
    errors,
    fetchPassage,
  };
}