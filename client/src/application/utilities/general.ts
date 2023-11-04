import { errorReporter } from '~/infrastructure/errorReporter';
import { ExtractedValidationError } from '~/infrastructure/serverGateway/types';

export function delay(ms: number) {
  return new Promise((res) => setTimeout(() => res(ms), ms));
}

export function reportCriticalAppError(error: unknown) {
  errorReporter.report({
    message: 'Application critical error',
    error,
  });
}

export function getFirstExtractedValidationErrorEntry(
  errors?: ExtractedValidationError[],
) {
  return {
    field: errors?.[0]?.field || null,
    key: errors?.[0]?.errorKeys?.[0] || null,
  };
}
