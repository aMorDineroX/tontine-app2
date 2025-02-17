import React from 'react';
import { useAppStore } from '../../lib/store';

export const ErrorHandler: React.FC = () => {
  const { error, setError } = useAppStore();

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg">
      <div className="flex justify-between items-center">
        <span>{error}</span>
        <button
          onClick={() => setError(null)}
          className="ml-4 text-white hover:text-red-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};