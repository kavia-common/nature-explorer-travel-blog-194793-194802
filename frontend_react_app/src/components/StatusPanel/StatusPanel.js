import React from "react";
import styles from "./StatusPanel.module.css";

// PUBLIC_INTERFACE
function StatusPanel({ title, description, actions }) {
  /** Standard panel for loading/error/empty states. */
  return (
    <section className={`${styles.panel} surface`} aria-live="polite">
      <div className={styles.icon} aria-hidden="true" />
      <div>
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.desc}>{description}</p> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </section>
  );
}

export default StatusPanel;
