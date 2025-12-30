import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell/AppShell";
import BlogListPage from "./pages/BlogListPage/BlogListPage";
import BlogReaderPage from "./pages/BlogReaderPage/BlogReaderPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./styles/global.css";

// PUBLIC_INTERFACE
function App() {
  /** Main application entry (router + shell). */
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/stories" replace />} />
          <Route path="/stories" element={<BlogListPage />} />
          <Route path="/stories/:id" element={<BlogReaderPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
