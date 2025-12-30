import React, { useMemo, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import StatusPanel from "../../components/StatusPanel/StatusPanel";
import { usePosts } from "../../hooks/usePosts";
import styles from "./BlogListPage.module.css";

function applyFilters(posts, filters) {
  const q = filters.query.trim().toLowerCase();
  return posts.filter((p) => {
    if (filters.location && p.location !== filters.location) return false;
    if (filters.theme && p.theme !== filters.theme) return false;

    if (q) {
      const blob = `${p.title || ""} ${p.excerpt || ""} ${p.location || ""} ${p.theme || ""}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });
}

// PUBLIC_INTERFACE
function BlogListPage() {
  /** Shows story listing with filters and masonry grid layout. */
  const { posts, loading, error, usingMock } = usePosts();
  const [filters, setFilters] = useState({ location: "", theme: "", query: "" });

  const filtered = useMemo(() => applyFilters(posts, filters), [posts, filters]);

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <h1 className={styles.title}>Stories for the road ahead</h1>
          <p className={styles.subtitle}>
            Browse travel notes that lean toward wild places—then open one full-screen and drift into the details.
          </p>
        </div>

        {usingMock ? (
          <div className={styles.mockNotice} role="status">
            <span className="badge">Offline mode</span>
            <span className="muted">Showing curated sample posts (backend not reachable).</span>
          </div>
        ) : null}
      </section>

      <FiltersBar posts={posts} filters={filters} onChange={setFilters} />

      <div className={styles.content}>
        {loading ? (
          <StatusPanel title="Gathering trails…" description="Loading stories from the backend." />
        ) : null}

        {!loading && error ? (
          <StatusPanel
            title="Couldn’t reach the trailhead"
            description={error.message || "The backend didn’t respond. Showing sample posts instead."}
          />
        ) : null}

        {!loading && filtered.length === 0 ? (
          <StatusPanel
            title="No stories match yet"
            description="Try clearing a filter, or broaden your search."
            actions={
              <button className="button secondary" onClick={() => setFilters({ location: "", theme: "", query: "" })}>
                Clear filters
              </button>
            }
          />
        ) : null}

        {!loading && filtered.length > 0 ? (
          <section className={styles.grid} aria-label="Story list">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default BlogListPage;
