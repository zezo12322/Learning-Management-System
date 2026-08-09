/**
 * Global route prefix for the whole API. Shared so that anything building an
 * absolute URL back to this service (e.g. the key/sub-playlist URLs embedded in
 * an HLS manifest) stays in step with `app.setGlobalPrefix`.
 */
export const API_GLOBAL_PREFIX = 'api/v1';
