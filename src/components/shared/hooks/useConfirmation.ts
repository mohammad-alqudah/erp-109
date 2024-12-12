import { useCallback } from 'react';

interface UseConfirmationProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
}

export function useConfirmation({ 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  onConfirm 
}: UseConfirmationProps) {
  const confirm = useCallback(() => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, [message, onConfirm]);

  return { confirm };
}