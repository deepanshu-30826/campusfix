import React, { useState } from "react";
import {
  statusBadgeClass,
  severityBadgeClass,
} from "../utils/complaintUtils.js";

function ComplaintDetails({
  complaints,
  selectedId,
  setPage,
  onUpdateComplaint,
}) {
  const complaint = complaints.find(function (c) {
    return c.id === selectedId;
  });

  const [newStatus, setNewStatus] = useState(
    complaint ? complaint.status : ""
  );

  const [newDepartment, setNewDepartment] = useState(
    complaint ? complaint.department : ""
  );

  const [saved, setSaved] = useState(false);

  if (!complaint) {
    return (
      <div>
        <p className="text-danger">Complaint not found.</p>

        <button
          className="btn btn-secondary"
          onClick={function () {
            setPage("list");
          }}
        >
          Back to List
        </button>
      </div>
    );
  }

  function handleUpdate() {
    onUpdateComplaint(selectedId, {
      status: newStatus,
      department: newDepartment,
    });

    setSaved(true);
  }

  return (
    <div>

      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={function () {
          setPage("list");
        }}
      >
        ← Back to List
      </button>

      <h4 className="mb-1">{complaint.title}</h4>

      <p className="text-muted small">
        Complaint ID: {complaint.id}
        &nbsp;|&nbsp;
        Filed on: {complaint.date}
      </p>

      <div className="row g-3 mb-4">

        {/* Complaint Details */}
        <div className="col-md-8">
          <div className="card">

            <div className="card-header">
              Complaint Details
            </div>

            <div className="card-body">

              <p>
                <strong>Student:</strong>{" "}
                {complaint.studentName}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {complaint.description}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {complaint.category}
                &nbsp;&nbsp;
                <strong>Location:</strong>{" "}
                {complaint.location}
              </p>

              <p>
                <strong>Severity:</strong>{" "}
                <span
                  className={severityBadgeClass(
                    complaint.severity
                  )}
                >
                  {complaint.severity}
                </span>

                &nbsp;&nbsp;

                <strong>Status:</strong>{" "}
                <span
                  className={statusBadgeClass(
                    complaint.status
                  )}
                >
                  {complaint.status}
                </span>
              </p>

              {complaint.department && (
                <p>
                  <strong>Assigned to:</strong>{" "}
                  {complaint.department}
                </p>
              )}

              {complaint.status === "Resolved" && (
                <div className="alert alert-success py-1 small mt-2 mb-0">
                  This complaint has been resolved.
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Admin Update */}
        <div className="col-md-4">
          <div className="card">

            <div className="card-header">
              Admin: Update Complaint
            </div>

            <div className="card-body">

              {saved && (
                <div className="alert alert-success py-1 small">
                  Saved successfully.
                </div>
              )}

              <div className="mb-3">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select form-select-sm"
                  value={newStatus}
                  onChange={function (e) {
                    setNewStatus(e.target.value);
                    setSaved(false);
                  }}
                >
                  <option>Submitted</option>
                  <option>Assigned</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Assign Department
                </label>

                <select
                  className="form-select form-select-sm"
                  value={newDepartment}
                  onChange={function (e) {
                    setNewDepartment(e.target.value);
                    setSaved(false);
                  }}
                >
                  <option value="">— None —</option>
                  <option>Maintenance</option>
                  <option>IT</option>
                  <option>Housekeeping</option>
                  <option>Administration</option>
                </select>

              </div>

              <button
                className="btn btn-primary btn-sm w-100"
                onClick={handleUpdate}
              >
                Save Changes
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ComplaintDetails;