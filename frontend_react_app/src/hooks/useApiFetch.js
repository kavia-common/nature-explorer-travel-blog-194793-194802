import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl, getDefaultHeaders } from "../config/api";

// PUBLIC_INTERFACE
export function useApiFetch(path, options) {
  /**
   * Generic data fetching hook.
   * - Uses REACT_APP_API_BASE / REACT_APP_BACKEND_URL as base.
   * - Provides loading/error states.
   * - Times out quickly to allow graceful fallback to mock data.
   */
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(path));
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!path) return;

      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutMs = 3500;
      const t = setTimeout(() => controller.abort(), timeoutMs);

      try {
        if (!apiBase) {
          throw new Error("API base URL not configured.");
        }

        const resp = await fetch(`${apiBase}${path}`, {
          method: options?.method || "GET",
          headers: {
            ...getDefaultHeaders(),
            ...(options?.headers || {})
          },
          body: options?.body,
          signal: controller.signal
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Request failed (${resp.status}): ${text || resp.statusText}`);
        }

        const json = await resp.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) {
          const message =
            e && typeof e === "object" && "message" in e ? String(e.message) : String(e);
          setError(new Error(message));
        }
      } finally {
        clearTimeout(t);
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [apiBase, path, options?.method, options?.body, JSON.stringify(options?.headers || {})]);

  return { data, loading, error, apiBase };
}
