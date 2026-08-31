import React from "react";
import {
  statusBadgeClass,
  severityBadgeClass,
} from "../utils/complaintUtils.js";

function Dashboard({ complaints, setPage, setSelectedId }) {
  const total = complaints.length;

  const pending = complaints.filter(function (c) {
    return c.status === "Submitted";
  }).length;

  const inProgress = complaints.filter(function (c) {
    return c.status === "In Progress" || c.status === "Assigned";
  }).length;

  const resolved = complaints.filter(function (c) {
    return c.status === "Resolved";
  }).length;

  // Get the latest 5 complaints
  const recent = [...complaints]
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 5);

  function handleView(id) {
    setSelectedId(id);
    setPage("details");
  }

  return (
    <div>
      <h4 className="mb-3">Dashboard</h4>

      {/* Statistics */}
      <div className="row g-3 mb-4">

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="stat-number">{total}</div>
              <div className="text-muted small">Total</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="stat-number text-secondary">
                {pending}
              </div>
              <div className="text-muted small">Pending</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="stat-number text-warning">
                {inProgress}
              </div>
              <div className="text-muted small">In Progress</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="stat-number text-success">
                {resolved}
              </div>
              <div className="text-muted small">
                Resolved
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent complaints */}
      <h6 className="mb-2">Recent Complaints</h6>

      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">

          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {recent.map(function (c) {
              return (
                <tr key={c.id}>

                  <td>{c.id}</td>

                  <td>{c.title}</td>

                  <td>{c.category}</td>

                  <td>
                    <span className={severityBadgeClass(c.severity)}>
                      {c.severity}
                    </span>
                  </td>

                  <td>
                    <span className={statusBadgeClass(c.status)}>
                      {c.status}
                    </span>
                  </td>

                  <td>{c.date}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={function () {
                        handleView(c.id);
                      }}
                    >
                      View
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Dashboard;