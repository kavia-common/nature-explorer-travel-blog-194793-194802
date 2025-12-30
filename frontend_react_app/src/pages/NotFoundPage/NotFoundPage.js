import React from "react";
import { Link } from "react-router-dom";
import StatusPanel from "../../components/StatusPanel/StatusPanel";

// PUBLIC_INTERFACE
function NotFoundPage() {
  /** 404 route. */
  return (
    <div className="container">
      <StatusPanel
        title="Page not found"
        description="That trail doesn’t exist. Try heading back to Stories."
        actions={
          <Link className="button" to="/stories">
            Go to Stories
          </Link>
        }
      />
    </div>
  );
}

export default NotFoundPage;
