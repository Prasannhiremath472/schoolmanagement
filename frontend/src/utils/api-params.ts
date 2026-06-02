/**
 * Removes empty/null/undefined values from query params
 * so the backend ValidationPipe doesn't reject them.
 */
export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) =>
      v !== undefined && v !== null && v !== '' && v !== 'undefined'
    )
  );
}
