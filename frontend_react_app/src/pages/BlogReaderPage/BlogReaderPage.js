import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusPanel from "../../components/StatusPanel/StatusPanel";
import { usePostById } from "../../hooks/usePosts";
import styles from "./BlogReaderPage.module.css";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
  } catch {
    return "";
  }
}

// PUBLIC_INTERFACE
function BlogReaderPage() {
  /** Full screen reader view for a single story. */
  const { id } = useParams();
  const nav = useNavigate();
  const { post, loading, error, usingMock } = usePostById(id);

  useEffect(() => {
    // Smooth "enter" transition class applied on mount
    const t = setTimeout(() => {
      const el = document.getElementById("readerRoot");
      if (el) el.classList.add(styles.entered);
    }, 30);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <StatusPanel title="Opening the map…" description="Loading this story." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <StatusPanel
          title="Story not found"
          description={error?.message || "We couldn't find that story."}
          actions={
            <Link className="button secondary" to="/stories">
              Back to stories
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.readerWrap} id="readerRoot">
      <div className={styles.readerBg} aria-hidden="true" />

      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <button className={`button secondary ${styles.backBtn}`} onClick={() => nav(-1)}>
            ← Back
          </button>
          <div className={styles.topMeta}>
            {usingMock ? <span className="badge">Offline mode</span> : null}
            <span className={styles.location}>{post.location || "Unknown location"}</span>
          </div>
        </div>
      </div>

      <article className={`container ${styles.article}`}>
        <header className={`${styles.header} surface`}>
          <div className={styles.headerInner}>
            <div className={styles.badges}>
              <span className="badge">{post.theme || "Theme"}</span>
              <span className={styles.date}>{formatDate(post.createdAt)}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
          </div>
        </header>

        <section className={`${styles.body} surface`} aria-label="Story content">
          {post.coverImageUrl ? (
            <img className={styles.cover} src={post.coverImageUrl} alt="" />
          ) : (
            <div className={styles.coverPlaceholder} aria-hidden="true">
              <div className={styles.coverMark} />
            </div>
          )}

          <div className={styles.content}>
            {(String(post.content || "").split("\n\n").filter(Boolean) || []).map((para, idx) => (
              <p key={idx} className={styles.paragraph}>
                {para}
              </p>
            ))}
          </div>

          <hr className="separator" />

          <div className={styles.bottomActions}>
            <Link className="button secondary" to="/stories">
              Browse more stories
            </Link>
            <Link className="button" to="/create">
              Write a new post
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

export default BlogReaderPage;
