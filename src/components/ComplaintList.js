import React, { useState } from "react";
import {
  statusBadgeClass,
  severityBadgeClass,
} from "../utils/complaintUtils.js";

function ComplaintList({ complaints, setPage, setSelectedId }) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [search, setSearch] = useState("");

  let result = complaints;

  // Filter by status
  if (filterStatus !== "All") {
    result = result.filter(function (c) {
      return c.status === filterStatus;
    });
  }

  // Filter by category
  if (filterCategory !== "All") {
    result = result.filter(function (c) {
      return c.category === filterCategory;
    });
  }

  // Filter by location
  if (filterLocation !== "All") {
    result = result.filter(function (c) {
      return c.location === filterLocation;
    });
  }

  // Search by title or location
  if (search.trim() !== "") {
    const lower = search.toLowerCase();

    result = result.filter(function (c) {
      return (
        c.title.toLowerCase().includes(lower) ||
        c.location.toLowerCase().includes(lower)
      );
    });
  }

  function handleView(id) {
    setSelectedId(id);
    setPage("details");
  }

  return (
    <div>
      <h4 className="mb-3">All Complaints</h4>

      {/* Search and filters */}
      <div className="row g-2 mb-3">

        <div className="col-sm-6 col-md-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search title or location..."
            value={search}
            onChange={function (e) {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="col-sm-6 col-md-3">
          <select
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={function (e) {
              setFilterStatus(e.target.value);
            }}
          >
            <option value="All">All Statuses</option>
            <option>Submitted</option>
            <option>Assigned</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <select
            className="form-select form-select-sm"
            value={filterCategory}
            onChange={function (e) {
              setFilterCategory(e.target.value);
            }}
          >
            <option value="All">All Categories</option>
            <option>Electrical</option>
            <option>Internet</option>
            <option>Cleanliness</option>
            <option>Classroom</option>
            <option>Hostel</option>
            <option>Other</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <select
            className="form-select form-select-sm"
            value={filterLocation}
            onChange={function (e) {
              setFilterLocation(e.target.value);
            }}
          >
            <option value="All">All Locations</option>
            <option>Hostel Block A</option>
            <option>Hostel Block B</option>
            <option>Computer Lab 2</option>
            <option>Library</option>
            <option>Classroom 301</option>
            <option>Classroom 102</option>
            <option>Block A</option>
            <option>Block B</option>
          </select>
        </div>

      </div>

      <p className="text-muted small">
        Showing {result.length} of {complaints.length} complaints
      </p>

      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">

          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {result.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-muted"
                >
                  No complaints match the current filters.
                </td>
              </tr>
            )}

            {result.map(function (c) {
              return (
                <tr key={c.id}>

                  <td>{c.id}</td>

                  <td>{c.title}</td>

                  <td>{c.category}</td>

                  <td>{c.location}</td>

                  <td>
                    <span
                      className={severityBadgeClass(
                        c.severity
                      )}
                    >
                      {c.severity}
                    </span>
                  </td>

                  <td>
                    <span
                      className={statusBadgeClass(
                        c.status
                      )}
                    >
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

export default ComplaintList;