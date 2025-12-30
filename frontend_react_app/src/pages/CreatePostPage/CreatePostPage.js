import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getApiBaseUrl, getDefaultHeaders } from "../../config/api";
import StatusPanel from "../../components/StatusPanel/StatusPanel";
import styles from "./CreatePostPage.module.css";

function fileToPreviewUrl(file) {
  if (!file) return "";
  return URL.createObjectURL(file);
}

async function tryCreatePost({ apiBase, payload }) {
  const resp = await fetch(`${apiBase}/posts`, {
    method: "POST",
    headers: {
      ...getDefaultHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Create failed (${resp.status}): ${text || resp.statusText}`);
  }

  return resp.json();
}

// PUBLIC_INTERFACE
function CreatePostPage() {
  /** Post creation screen with image upload UI (client-side preview). */
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("Mountains");
  const [content, setContent] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageAlt, setImageAlt] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  const previewUrl = useMemo(() => fileToPreviewUrl(imageFile), [imageFile]);

  function validate() {
    if (!title.trim()) return "Title is required.";
    if (!location.trim()) return "Location is required.";
    if (!theme.trim()) return "Theme is required.";
    if (!content.trim()) return "Content is required.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setCreated(null);

    const msg = validate();
    if (msg) {
      setError(new Error(msg));
      return;
    }

    // Note: Actual binary upload depends on backend API; for now we include a placeholder field.
    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      location: location.trim(),
      theme: theme.trim(),
      content: content.trim(),
      image: imageFile
        ? {
            fileName: imageFile.name,
            fileType: imageFile.type,
            fileSize: imageFile.size,
            alt: imageAlt.trim()
          }
        : null
    };

    if (!apiBase) {
      setError(
        new Error(
          "Backend is not configured (REACT_APP_API_BASE/REACT_APP_BACKEND_URL). This UI shows how post creation will work once the API is available."
        )
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await tryCreatePost({ apiBase, payload });
      setCreated(res);
      setTitle("");
      setExcerpt("");
      setLocation("");
      setTheme("Mountains");
      setContent("");
      setImageFile(null);
      setImageAlt("");
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err ? String(err.message) : String(err);
      setError(new Error(message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <header className={styles.hero}>
        <h1 className={styles.title}>Create a new post</h1>
        <p className={styles.subtitle}>
          Draft your story, add a cover image, and publish when ready. (If the backend is offline, submission will be disabled.)
        </p>
      </header>

      {created ? (
        <StatusPanel
          title="Post created"
          description="Your story was submitted successfully."
          actions={
            <>
              <Link className="button secondary" to="/stories">
                Back to stories
              </Link>
            </>
          }
        />
      ) : null}

      {error ? (
        <StatusPanel title="Couldn’t submit" description={error.message} actions={<Link className="button secondary" to="/stories">Browse stories</Link>} />
      ) : null}

      <form className={`${styles.form} surface`} onSubmit={onSubmit} aria-label="Create a post form">
        <div className={styles.grid}>
          <label className={styles.field}>
            <span className={styles.label}>Title</span>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A name that invites the reader in…" />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Location</span>
            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Rocky Mountains" />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Theme</span>
            <select className="select" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="Mountains">Mountains</option>
              <option value="Forests">Forests</option>
              <option value="Rivers">Rivers</option>
              <option value="Coast">Coast</option>
              <option value="Desert">Desert</option>
              <option value="City">City</option>
            </select>
          </label>

          <label className={`${styles.field} ${styles.full}`}>
            <span className={styles.label}>Excerpt (optional)</span>
            <input className="input" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A short preview shown in the grid…" />
          </label>

          <label className={`${styles.field} ${styles.full}`}>
            <span className={styles.label}>Story</span>
            <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write in paragraphs… (use blank lines to separate them)" />
          </label>

          <div className={`${styles.upload} ${styles.full}`}>
            <div className={styles.uploadHeader}>
              <div>
                <div className={styles.uploadTitle}>Cover image</div>
                <div className={styles.uploadHint}>Upload UI includes preview. Actual binary upload depends on backend support.</div>
              </div>
              <label className={`button secondary ${styles.uploadButton}`}>
                Choose file
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                    setImageFile(f);
                  }}
                />
              </label>
            </div>

            <div className={styles.previewArea}>
              {previewUrl ? (
                <img className={styles.previewImg} src={previewUrl} alt={imageAlt || ""} />
              ) : (
                <div className={styles.previewPlaceholder} aria-hidden="true">
                  <div className={styles.previewMark} />
                  <div className={styles.previewText}>No image selected</div>
                </div>
              )}

              <div className={styles.uploadMeta}>
                <label className={styles.field}>
                  <span className={styles.label}>Alt text (optional)</span>
                  <input
                    className="input"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Describe the image for accessibility"
                  />
                </label>
                <div className={styles.fileDetails}>
                  <div className={styles.fileLine}>
                    <span className={styles.fileKey}>Backend:</span>{" "}
                    <span className={styles.fileValue}>{apiBase ? apiBase : "Not configured"}</span>
                  </div>
                  <div className={styles.fileLine}>
                    <span className={styles.fileKey}>Selected:</span>{" "}
                    <span className={styles.fileValue}>{imageFile ? imageFile.name : "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="separator" />

        <div className={styles.actions}>
          <Link className="button secondary" to="/stories">
            Cancel
          </Link>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? "Publishing…" : "Publish"}
          </button>
        </div>

        {!apiBase ? (
          <p className={styles.apiNotice} role="note">
            Submission is disabled until <code>REACT_APP_API_BASE</code> or <code>REACT_APP_BACKEND_URL</code> is configured.
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default CreatePostPage;
