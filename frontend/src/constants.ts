export const MAX_ARTICLE_LENGTH = 20_000;

/**
 * Client-side minimum so obviously-too-short input is caught before a request.
 * Keep this in sync with the minimum length in the backend's NewsInput schema.
 * If the backend's minimum is higher, its 422 response is still shown to the user.
 */
export const MIN_ARTICLE_LENGTH = 20;

export const ARTICLE_INPUT_ID = "article-input";
export const RESULTS_ID = "results";
