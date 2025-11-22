import React, { useState } from "react";
import "./Research.css";

export default function Research() {
  const [open, setOpen] = useState({
    intro: true,
    dataset: false,
    preprocessing: false,
    ctDetection: false,
    model: false,
    pipeline: false,
    metrics: false,
    limitations: false,
    future: false,
  });

  const sampleMetrics = {
    resnet: { acc: 0.82, prec: 0.80, recall: 0.78 },
    vgg: { acc: 0.78, prec: 0.75, recall: 0.73 },
    inception: { acc: 0.85, prec: 0.83, recall: 0.82 },
    ensemble: { acc: 0.88, prec: 0.86, recall: 0.85 },
  };

  const toggle = (key) => {
    setOpen((o) => ({ ...o, [key]: !o[key] }));
  };

  return (
    <main className="research-page">
      <header className="research-header">
        <h1>LungCare — Research & Methodology</h1>
        <p>
          Complete breakdown of the dataset, preprocessing, CT validation logic,
          deep learning models, and the final ensemble prediction system used in
          the Lung Cancer Detection app.
        </p>
      </header>

      {/* INTRODUCTION */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("intro")}>
          <span>📘 Introduction</span>
          <span>{open.intro ? "−" : "+"}</span>
        </button>

        {open.intro && (
          <div className="body">
            <p>
              LungCare is a 3-model AI system that analyzes lung CT scans and
              predicts whether a scan indicates <b>Benign</b>, <b>Malignant</b>,
              or <b>Normal</b>. The system uses a frontend (React), backend
              (Node.js), and a deep learning server (Flask + Keras models).
            </p>
          </div>
        )}
      </section>

      {/* DATASET */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("dataset")}>
          <span>📂 Dataset Used</span>
          <span>{open.dataset ? "−" : "+"}</span>
        </button>

        {open.dataset && (
          <div className="body">
            <ul>
              <li>Dataset used: <b>IQ-OTH/NCCD Lung Cancer Dataset</b></li>
              <li>Three classes:
                <ul>
                  <li>Normal</li>
                  <li>Benign</li>
                  <li>Malignant</li>
                </ul>
              </li>
              <li>Total images ≈ 1100</li>
              <li>Images manually checked to remove non-CT images</li>
            </ul>
          </div>
        )}
      </section>

      {/* PREPROCESSING */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("preprocessing")}>
          <span>🧹 Image Preprocessing</span>
          <span>{open.preprocessing ? "−" : "+"}</span>
        </button>

        {open.preprocessing && (
          <div className="body">
            <p>The uploaded image undergoes several transformations:</p>
            <ol>
              <li>Resize to <b>224 × 224</b></li>
              {/* <li>Convert to RGB</li> */}
              <li>Normalize pixel values to <b>0–1</b></li>
              <li>Create a 4D tensor shape <code>(1,224,224,3)</code></li>
            </ol>
            <p>This ensures compatibility with all three deep learning models.</p>
          </div>
        )}
      </section>

      {/* CT DETECTION */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("ctDetection")}>
          <span>🩻 CT Validation Logic (Custom Designed)</span>
          <span>{open.ctDetection ? "−" : "+"}</span>
        </button>

        {open.ctDetection && (
          <div className="body">
            <p>
              Before predicting, the app verifies whether the uploaded image is
              really a lung CT scan using:
            </p>
            <ul>
              <li><b>Color Standard Deviation</b> — CT scans are grayscale-dominant</li>
              <li><b>Texture Standard Deviation</b> — checks intensity variations</li>
              <li><b>Edge Count</b> — CT scans have medical-grade sharpness</li>
              <li><b>Grayscale score</b> — difference between R/G/B channels</li>
            </ul>
            <p>
              If the image fails these tests, prediction is skipped and the user
              is warned.
            </p>
          </div>
        )}
      </section>

      {/* MODEL */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("model")}>
          <span>🧠 Models Used (3-Model Ensemble)</span>
          <span>{open.model ? "−" : "+"}</span>
        </button>

        {open.model && (
          <div className="body">
            <p>The system uses three pretrained CNN models:</p>
            <ul>
              <li><b>ResNet50</b> — great feature extractor</li>
              <li><b>VGG16</b> — simple but reliable for medical images</li>
              <li><b>InceptionV3</b> — excellent at capturing multi-scale features</li>
            </ul>
            <p>
              Each model predicts independently, and the frontend displays all
              three predictions.
            </p>
          </div>
        )}
      </section>

      {/* PIPELINE */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("pipeline")}>
          <span>⚙ Full Inference Pipeline</span>
          <span>{open.pipeline ? "−" : "+"}</span>
        </button>

        {open.pipeline && (
          <div className="body">
            <ol>
              <li>User uploads image in React</li>
              <li>Node.js verifies file type + size</li>
              <li>Node forwards file to Flask using multipart form</li>
              <li>Flask preprocesses image</li>
              {/* <li>CT-validation function checks authenticity</li> */}
              <li>ResNet / VGG16 / InceptionV3 predict independently</li>
              <li>Prediction JSON return to Node → React</li>
              <li>React shows results beautifully</li>
            </ol>
          </div>
        )}
      </section>

      {/* METRICS */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("metrics")}>
          <span>📊 Model Metrics (Sample)</span>
          <span>{open.metrics ? "−" : "+"}</span>
        </button>

        {open.metrics && (
          <div className="body metrics">
            <h3>ResNet50</h3>
            <p>Accuracy: 82% | Precision: 80% | Recall: 78%</p>

            <h3>VGG16</h3>
            <p>Accuracy: 78% | Precision: 75% | Recall: 73%</p>

            <h3>InceptionV3</h3>
            <p>Accuracy: 85% | Precision: 83% | Recall: 82%</p>

            <h3>Ensemble (Final Output)</h3>
            <p>Accuracy: 88% | Precision: 86% | Recall: 85%</p>
          </div>
        )}
      </section>

      {/* LIMITATIONS
      <section className="card">
        <button className="accordion" onClick={() => toggle("limitations")}>
          <span>⚠ Limitations</span>
          <span>{open.limitations ? "−" : "+"}</span>
        </button>

        {open.limitations && (
          <div className="body">
            <ul>
              <li>Dataset size is small (~1100 images)</li>
              <li>No clinical validation yet</li>
              <li>2D CT slice, not full 3D volumetric CT</li>
              <li>Different scanners produce different intensities</li>
            </ul>
          </div>
        )}
      </section> */}

      {/* FUTURE WORK */}
      <section className="card">
        <button className="accordion" onClick={() => toggle("future")}>
          <span>🚀 Future Enhancements</span>
          <span>{open.future ? "−" : "+"}</span>
        </button>

        {open.future && (
          <div className="body">
            <ul>
  <li>Build a custom CNN architecture designed specifically for CT lung analysis to improve accuracy and robustness.</li>
  <li>Create separate panels for patients and doctors — with role-based access, dashboards, and advanced functionalities.</li>
  <li>Optimize real-time prediction pipeline for lower latency and better user experience.</li>
</ul>

          </div>
        )}
      </section>
    </main>
  );
}
