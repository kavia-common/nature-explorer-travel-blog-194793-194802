import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  } catch {
    return "";
  }
}

// PUBLIC_INTERFACE
function PostCard({ post }) {
  /** Compact preview card for a travel story. */
  const cover =
    post.coverImageUrl && String(post.coverImageUrl).trim().length > 0 ? post.coverImageUrl : null;

  return (
    <article className={`${styles.card} surface`}>
      <Link to={`/stories/${encodeURIComponent(post.id)}`} className={styles.link}>
        <div className={styles.media} aria-hidden="true">
          {cover ? (
            <img className={styles.image} src={cover} alt="" />
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.placeholderMark} />
              <div className={styles.placeholderText}>No image</div>
            </div>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.metaRow}>
            <span className="badge">{post.theme || "Theme"}</span>
            <span className={styles.meta}>{formatDate(post.createdAt)}</span>
          </div>

          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.footerRow}>
            <span className={styles.location}>{post.location || "Unknown location"}</span>
            <span className={styles.readMore}>Read →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;
