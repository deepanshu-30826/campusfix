import React from "react";

function Navbar({ currentPage, setPage }) {
  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "report", label: "Report Issue" },
    { key: "list", label: "Complaints" },
  ];

  // "list" tab should also appear active when viewing complaint details
  function isActive(key) {
    if (key === "list" && currentPage === "details") return true;
    return currentPage === key;
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand fw-bold">🏫 CampusFix</span>
        <span className="text-white-50 small d-none d-md-inline">
          Campus Issue &amp; Resolution System
        </span>
      </nav>

      <div className="bg-light border-bottom px-3 py-2">
        <div className="d-flex gap-2 flex-wrap">
          {navItems.map(function (item) {
            return (
              <button
                key={item.key}
                className={"btn btn-sm " + (isActive(item.key) ? "btn-dark" : "btn-outline-dark")}
                onClick={function () { setPage(item.key); }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;