const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");

const app = express();
const upload = multer({ dest: "uploads/" });

// ---------------------
// BASIC CONFIG
// ---------------------
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------
// MONGO CONNECTION
// ---------------------
mongoose.connect(
  "mongodb://127.0.0.1:27017/lung_cancer_auth"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// ---------------------
// AUTH ROUTES
// ---------------------
app.use("/auth", authRoutes);

// ---------------------
// UPLOAD + PREDICT ROUTE
// ---------------------
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

app.post("/api/predict", auth, upload.single("scan"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Only JPG and PNG allowed" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "File too large (max 5MB)" });
    }

    const formData = new FormData();
    formData.append("scan", fs.createReadStream(req.file.path));

    // 👉 SEND TO FLASK
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    fs.unlinkSync(req.file.path);

    return res.json(response.data);

  } catch (err) {
    console.error("Prediction Error:", err);
    return res.status(500).json({ error: "Prediction failed" });
  }
});

// ---------------------
app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
