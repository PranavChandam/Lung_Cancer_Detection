import { useState } from "react";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [preprocessImg, setPreprocessImg] = useState(null);
  const [preprocessLoading, setPreprocessLoading] = useState(false);

  // ============================================
  // FILE VALIDATION + PREPROCESSING (224x224)
  // ============================================
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
      setMessage("File too large. Max 5MB allowed.");
      setFile(null);
      return;
    }

    setMessage("");
    setFile(uploaded);

    // Preprocessing
    setPreprocessLoading(true);

    const img = new Image();
    img.src = URL.createObjectURL(uploaded);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 224, 224);

      const processedURL = canvas.toDataURL("image/jpeg");
      setPreprocessImg(processedURL);

      setTimeout(() => setPreprocessLoading(false), 600);
    };
  };

  // ============================================
  // UPLOAD + PREDICT → SAVE → REDIRECT
  // ============================================
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("scan", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.error || "Prediction failed");
        return;
      }

      window.location.href = "/result";
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1 className="main-title">Lung Cancer Detection System</h1>
      <p className="subtitle" style={{ textAlign: "center" }}>
        Upload your CT scan for prediction
      </p>

      <div className="upload-card">
        <h2>Upload CT Scan Image</h2>

        {/* Original + Preprocessed */}
        <div className="image-row">
          <div className="img-box">
            <h4>Original Image</h4>
            {file ? (
              <img src={URL.createObjectURL(file)} alt="original" />
            ) : (
              <p>No Image Selected</p>
            )}
          </div>

          <div className="img-box">
            <h4>Preprocessed (224 × 224)</h4>
            {preprocessLoading ? (
              <div className="spinner"></div>
            ) : preprocessImg ? (
              <img src={preprocessImg} alt="processed" />
            ) : (
              <p>No Image</p>
            )}
          </div>
        </div>

        {/* Select File */}
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
          {loading ? "Processing..." : "Upload & Predict"}
        </button>

        {/* Error Message */}
        {message && <p className="upload-message">{message}</p>}

        {/* Refresh Button (visible only when error exists) */}
        {message && (
          <button
            className="refresh-btn"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}

export default Upload;
