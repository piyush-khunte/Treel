export type IntegrationErrorCode =
  | 'SERVICE_NOT_CONFIGURED'
  | 'AUTHENTICATION_FAILED'
  | 'EXTERNAL_API_ERROR'
  | 'VALIDATION_ERROR'
  | 'TIMEOUT'
  | 'RATE_LIMITED';

export interface IntegrationError {
  code: IntegrationErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export interface IntegrationResult<T = unknown> {
  success: boolean;
  configured: boolean;
  data?: T;
  error?: IntegrationError;
}
