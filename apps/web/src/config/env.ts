const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

/** API origin used by axios + Google OAuth redirect. */
export const API_BASE_URL = trimTrailingSlash(
  process.env.REACT_APP_API_URL || "http://localhost:8090"
);
