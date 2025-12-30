import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppShell.module.css";

// PUBLIC_INTERFACE
function AppShell({ children }) {
  /** Provides animated header/navigation wrapper and ambient backdrop. */
  return (
    <div className={styles.shell}>
      <div className="appBackdrop" aria-hidden="true" />
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.brand}>
            <div className={styles.logoMark} aria-hidden="true" />
            <div>
              <div className={styles.brandName}>Free Mans Journey</div>
              <div className={styles.brandTagline}>Travel stories shaped by forests, mountains, and rivers.</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Primary navigation">
            <NavLink
              to="/stories"
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
            >
              Stories
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
            >
              Create
            </NavLink>
          </nav>
        </div>

        <div className={styles.headerGlow} aria-hidden="true" />
        <div className={styles.headerDivider} aria-hidden="true" />
      </header>

      <main className={styles.main} id="main">
        {children}
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <span className="muted">
            Built for quiet adventures. Tip: use filters to find stories by place or theme.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default AppShell;
