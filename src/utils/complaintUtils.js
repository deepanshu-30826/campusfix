// Generate a new complaint ID
function generateId(complaints) {
  const next = complaints.length + 1;

  return "CF-" + String(next).padStart(3, "0");
}

// Return today's date
function todayDate() {
  return new Date().toISOString().split("T")[0];
}

// Return Bootstrap class for status
function statusBadgeClass(status) {
  const map = {
    Submitted: "secondary",
    Assigned: "primary",
    "In Progress": "warning",
    Resolved: "success",
  };

  return "badge bg-" + (map[status] || "secondary");
}

// Return Bootstrap class for severity
function severityBadgeClass(severity) {
  const map = {
    Low: "success",
    Medium: "info",
    High: "warning",
    Critical: "danger",
  };

  return "badge bg-" + (map[severity] || "secondary");
}

export {
  generateId,
  todayDate,
  statusBadgeClass,
  severityBadgeClass,
};