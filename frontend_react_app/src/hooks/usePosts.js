import { useMemo } from "react";
import { useApiFetch } from "./useApiFetch";
import { getMockPosts } from "../mock/mockPosts";

function normalizePosts(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.posts)) return payload.posts;
  return [];
}

// PUBLIC_INTERFACE
export function usePosts() {
  /** Fetches all posts. Falls back to mock posts if API unavailable. */
  const { data, loading, error, apiBase } = useApiFetch("/posts");

  const posts = useMemo(() => {
    const normalized = normalizePosts(data);
    if (normalized.length > 0) return normalized;

    // fallback when API is missing or unavailable
    if (!apiBase || error) return getMockPosts();
    return normalized;
  }, [data, apiBase, error]);

  return {
    posts,
    loading: loading && !(posts && posts.length > 0),
    error: apiBase ? error : null,
    usingMock: !apiBase || Boolean(error)
  };
}

// PUBLIC_INTERFACE
export function usePostById(id) {
  /** Fetches a single post by id. Falls back to mock posts when API unavailable. */
  const { data, loading, error, apiBase } = useApiFetch(id ? `/posts/${encodeURIComponent(id)}` : null);

  const post = useMemo(() => {
    if (data && typeof data === "object") {
      if (data.post) return data.post;
      return data;
    }
    if (!apiBase || error) {
      return getMockPosts().find((p) => p.id === id) || null;
    }
    return null;
  }, [data, apiBase, error, id]);

  return {
    post,
    loading: loading && !post,
    error: apiBase ? error : null,
    usingMock: !apiBase || Boolean(error)
  };
}
