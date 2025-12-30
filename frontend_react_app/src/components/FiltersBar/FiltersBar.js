import React, { useMemo } from "react";
import styles from "./FiltersBar.module.css";

// PUBLIC_INTERFACE
function FiltersBar({ posts, filters, onChange }) {
  /** Filters by location and theme. Controlled component. */
  const locationOptions = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.location) set.add(p.location);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const themeOptions = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.theme) set.add(p.theme);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  return (
    <section className={`${styles.bar} surface`} aria-label="Filters">
      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Location</span>
          <select
            className="select"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
          >
            <option value="">All locations</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Theme</span>
          <select
            className="select"
            value={filters.theme}
            onChange={(e) => onChange({ ...filters, theme: e.target.value })}
          >
            <option value="">All themes</option>
            {themeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Search</span>
          <input
            className="input"
            value={filters.query}
            placeholder="title, excerpt, or place…"
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
          />
        </label>
      </div>

      <div className={styles.hint} aria-live="polite">
        <span className="muted">
          Tip: combine filters to find a story that matches your mood.
        </span>
      </div>
    </section>
  );
}

export default FiltersBar;
