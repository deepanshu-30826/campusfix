import React, { useState } from "react";
import { generateId, todayDate } from "../utils/complaintUtils.js";

function ComplaintForm({ complaints, onAddComplaint }) {
  const [form, setForm] = useState({
    studentName: "",
    title: "",
    description: "",
    category: "Electrical",
    location: "",
    severity: "Medium",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.studentName.trim()) newErrors.studentName = "Student name is required.";
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    setErrors({});

    const newComplaint = {
      id: generateId(complaints),
      studentName: form.studentName,
      title: form.title,
      description: form.description,
      category: form.category,
      location: form.location,
      severity: form.severity,
      status: "Submitted",
      department: "",
      date: todayDate(),
    };

    onAddComplaint(newComplaint);

    setSuccessMsg("Complaint " + newComplaint.id + " submitted successfully.");
    setForm({
      studentName: "",
      title: "",
      description: "",
      category: "Electrical",
      location: "",
      severity: "Medium",
    });
  }

  return (
    <div>
      <h4 className="mb-3">Report a Complaint</h4>

      {successMsg && (
        <div className="alert alert-success alert-dismissible">
          {successMsg}
          <button className="btn-close" onClick={function () { setSuccessMsg(""); }}></button>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Student Name</label>
              <input
                type="text"
                name="studentName"
                className={"form-control" + (errors.studentName ? " is-invalid" : "")}
                value={form.studentName}
                onChange={handleChange}
              />
              {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Complaint Title</label>
              <input
                type="text"
                name="title"
                className={"form-control" + (errors.title ? " is-invalid" : "")}
                value={form.title}
                onChange={handleChange}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className={"form-control" + (errors.description ? " is-invalid" : "")}
                rows="3"
                value={form.description}
                onChange={handleChange}
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                  <option>Electrical</option>
                  <option>Internet</option>
                  <option>Cleanliness</option>
                  <option>Classroom</option>
                  <option>Hostel</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className={"form-control" + (errors.location ? " is-invalid" : "")}
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Computer Lab 2"
                />
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Severity</label>
                <select name="severity" className="form-select" value={form.severity} onChange={handleChange}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit Complaint</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;