import React, { useState, useEffect } from "react";
import sampleComplaints from "./data/complaints.js";
import Navbar from "./components/navbar.js";
import Dashboard from "./components/Dashboard.js";
import ComplaintForm from "./components/ComplaintForm.js";
import ComplaintList from "./components/ComplaintList.js";
import ComplaintDetails from "./components/ComplaintDetails.js";
import "./App.css";

// Load complaints from localStorage
function loadComplaints() {
  const saved = localStorage.getItem("campusfix_complaints");

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(
    "campusfix_complaints",
    JSON.stringify(sampleComplaints)
  );

  return sampleComplaints;
}

// Save complaints to localStorage
function saveComplaints(complaints) {
  localStorage.setItem(
    "campusfix_complaints",
    JSON.stringify(complaints)
  );
}

function App() {
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(null);

  // Load complaints when app starts
  useEffect(function () {
    const data = loadComplaints();
    setComplaints(data);
  }, []);

  // Add a new complaint
  function handleAddComplaint(newComplaint) {
    const updated = [...complaints, newComplaint];

    setComplaints(updated);
    saveComplaints(updated);
  }

  // Update an existing complaint
  function handleUpdateComplaint(id, changes) {
    const updated = complaints.map(function (c) {
      if (c.id === id) {
        return { ...c, ...changes };
      }

      return c;
    });

    setComplaints(updated);
    saveComplaints(updated);
  }

  // Decide which page to show
  function renderPage() {
    if (page === "dashboard") {
      return (
        <Dashboard
          complaints={complaints}
          setPage={setPage}
          setSelectedId={setSelectedId}
        />
      );
    }

    if (page === "report") {
      return (
        <ComplaintForm
          complaints={complaints}
          onAddComplaint={handleAddComplaint}
        />
      );
    }

    if (page === "list") {
      return (
        <ComplaintList
          complaints={complaints}
          setPage={setPage}
          setSelectedId={setSelectedId}
        />
      );
    }

    if (page === "details") {
      return (
        <ComplaintDetails
          complaints={complaints}
          selectedId={selectedId}
          setPage={setPage}
          onUpdateComplaint={handleUpdateComplaint}
        />
      );
    }

    return null;
  }

  return (
    <div>
      <Navbar currentPage={page} setPage={setPage} />

      <div className="container-fluid py-4 px-4">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;