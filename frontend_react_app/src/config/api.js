const envBase =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  "";

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns configured API base URL or empty string if not configured. */
  return String(envBase || "").replace(/\/+$/, "");
}

// PUBLIC_INTERFACE
export function getDefaultHeaders() {
  /** Default headers for JSON requests. */
  return {
    Accept: "application/json"
  };
}
