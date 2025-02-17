import { useState, useCallback } from 'react';
import { ZodSchema, ZodError } from 'zod';

interface ValidationResult<T> {
  isValid: boolean;
  errors: Record<keyof T, string> | null;
}

export function useValidation<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<Record<keyof T, string> | null>(null);

  const validate = useCallback(
    (data: unknown): ValidationResult<T> => {
      try {
        schema.parse(data);
        setErrors(null);
        return { isValid: true, errors: null };
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors = error.errors.reduce((acc, curr) => {
            const path = curr.path[0] as keyof T;
            acc[path] = curr.message;
            return acc;
          }, {} as Record<keyof T, string>);
          setErrors(formattedErrors);
          return { isValid: false, errors: formattedErrors };
        }
        return { isValid: false, errors: null };
      }
    },
    [schema]
  );

  return { validate, errors, clearErrors: () => setErrors(null) };
}