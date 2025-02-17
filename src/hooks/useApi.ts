import { useState, useCallback } from 'react';
import api from '../lib/http/api.service';
import { AppError } from '../lib/errors';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.request({
        url,
        method,
        data: body
      });
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : new AppError(500, 'Une erreur est survenue');
      setState(prev => ({ ...prev, loading: false, error: appError }));
      throw appError;
    }
  }, []);

  return { ...state, execute };
}