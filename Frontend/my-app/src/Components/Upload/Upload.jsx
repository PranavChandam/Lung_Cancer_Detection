import { useState } from "react";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ===========================
  // FILE VALIDATION
  // ===========================
  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(uploaded.type)) {
      setMessage("Only JPG and PNG images are allowed.");
      setFile(null);
      return;
    }

    if (uploaded.size > 5 * 1024 * 1024) {
      setMessage("File too large. Maximum size is 5MB.");
      setFile(null);
      return;
    }

    setFile(uploaded);
    setMessage("");
  };

  // ===========================
  // UPLOAD + PREDICT + REDIRECT
  // ===========================
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("scan", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setMessage(data.error);
        return;
      }

      // ⭐ Save result & redirect
      localStorage.setItem("modelResults", JSON.stringify(data));
      window.location.href = "/result";

    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1 className="main-title">Lung Cancer Detection System</h1>
      <p className="subtitle">Upload your CT scan for prediction</p>

      <div className="upload-card">
        <div className="upload-header">
          <h2>Upload CT Scan Image</h2>
        </div>

        {/* Preview */}
        {file ? (
          <div className="preview-box">
            <img src={URL.createObjectURL(file)} alt="Preview" />
          </div>
        ) : (
          <div className="preview-placeholder">
            <p>No Image Selected</p>
          </div>
        )}

        {/* File Input */}
        <label className="file-label">
          {file ? file.name : "Choose CT Scan Image"}
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
        </label>

        {/* Upload Button */}
        <button className="upload-btn" onClick={handleUpload} disabled={loading}>
          {loading ? (
            <div className="spinner"></div>  // ⭐ LOADING SPINNER
          ) : (
            "Upload & Predict"
          )}
        </button>

        {message && <p className="upload-message">{message}</p>}
      </div>
    </div>
  );
}

export default Upload;
