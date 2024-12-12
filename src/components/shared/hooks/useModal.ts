import { useState } from 'react';

export function useModal<T = any>(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState<T | null>(null);

  const open = (modalData?: T) => {
    setIsOpen(true);
    if (modalData) {
      setData(modalData);
    }
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return {
    isOpen,
    data,
    open,
    close,
  };
}