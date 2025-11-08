/**
 * Error Handler Utility
 * Sanitizes error messages to prevent exposing sensitive information
 */

export interface SanitizedError {
  message: string;
  statusCode?: number;
}

/**
 * Patterns that indicate sensitive information in error messages
 */
const SENSITIVE_PATTERNS = [
  /SQLSTATE\[.*?\]/gi,
  /SQL:.*?(\)|$)/gi,
  /Connection:.*?(\)|,)/gi,
  /insert into.*?(\)|$)/gi,
  /select.*?from.*?(\)|$)/gi,
  /update.*?set.*?(\)|$)/gi,
  /delete from.*?(\)|$)/gi,
  /Unknown column.*?in.*?list/gi,
  /Table.*?doesn't exist/gi,
  /Database.*?doesn't exist/gi,
  /Syntax error.*?near/gi,
  /Call to.*?function.*?on/gi,
  /in \/.*?\.php/gi,
  /Stack trace:/gi,
  /Whoops.*?Exception/gi,
];

/**
 * User-friendly error messages based on HTTP status codes
 */
const STATUS_MESSAGES: Record<number, string> = {
  400: "Permintaan tidak valid. Silakan coba lagi.",
  401: "Sesi Anda telah berakhir. Silakan login kembali.",
  403: "Anda tidak memiliki akses untuk melakukan tindakan ini.",
  404: "Data tidak ditemukan.",
  422: "Data yang Anda masukkan tidak valid.",
  429: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi.",
  500: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
  502: "Server sedang tidak dapat diakses. Silakan coba lagi nanti.",
  503: "Layanan sedang dalam pemeliharaan. Silakan coba lagi nanti.",
};

/**
 * Check if error message contains sensitive information
 */
function containsSensitiveInfo(message: string): boolean {
  if (!message) return false;
  return SENSITIVE_PATTERNS.some(pattern => pattern.test(message));
}

/**
 * Sanitize error message by removing sensitive information
 * @param message - Original error message
 * @param statusCode - HTTP status code (optional)
 * @returns Sanitized user-friendly error message
 */
export function sanitizeErrorMessage(
  message: string,
  statusCode?: number
): string {
  // If message contains SQL or other sensitive info, return generic message
  if (containsSensitiveInfo(message)) {
    if (__DEV__) {
      console.warn("⚠️ Sensitive error detected and sanitized:", message);
    }

    // Return status-based message or generic message
    return statusCode && STATUS_MESSAGES[statusCode]
      ? STATUS_MESSAGES[statusCode]
      : "Terjadi kesalahan. Silakan coba lagi.";
  }

  // If we have a status code and a generic message, use status-based message
  if (statusCode && STATUS_MESSAGES[statusCode]) {
    // Check if message is too generic
    const genericMessages = [
      "server error",
      "internal error",
      "error occurred",
      "something went wrong",
    ];

    const isGeneric = genericMessages.some(generic =>
      message.toLowerCase().includes(generic)
    );

    if (isGeneric) {
      return STATUS_MESSAGES[statusCode];
    }
  }

  // Return original message if it's safe
  return message;
}

/**
 * Handle API error response and return sanitized error
 * @param error - Error object from API
 * @param defaultMessage - Default message if no message in error
 * @returns Sanitized error object
 */
export function handleApiError(
  error: any,
  defaultMessage: string = "Terjadi kesalahan. Silakan coba lagi."
): SanitizedError {
  const statusCode = error?.status || error?.statusCode;
  const originalMessage = error?.message || defaultMessage;

  const sanitizedMessage = sanitizeErrorMessage(originalMessage, statusCode);

  return {
    message: sanitizedMessage,
    statusCode,
  };
}

/**
 * Log error for debugging (only in development)
 * @param context - Context where error occurred
 * @param error - Error object
 */
export function logError(context: string, error: any): void {
  if (__DEV__) {
    console.group(`🔴 Error in ${context}`);
    console.error("Error details:", error);
    if (error?.message) {
      console.error("Message:", error.message);
    }
    if (error?.status || error?.statusCode) {
      console.error("Status:", error.status || error.statusCode);
    }
    if (error?.errors) {
      console.error("Validation errors:", error.errors);
    }
    console.groupEnd();
  }
}
