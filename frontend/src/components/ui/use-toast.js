import { useCallback } from 'react';

export function useToast() {
  const showToast = useCallback((message, type = 'info') => {
    alert(`[type.toUpperCase()]{message}`);
  }, []);

  return {
    toast: showToast,
  };
}
