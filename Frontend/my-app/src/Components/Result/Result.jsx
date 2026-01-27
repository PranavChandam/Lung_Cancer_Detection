import "./Result.css";

function Result() {
  const result = JSON.parse(localStorage.getItem("modelResults"));

  if (!result) {
    return (
      <div className="result-page">
        <h2 className="no-result-title">No results found</h2>
        <p className="no-result-text">Please upload an image first.</p>

        <button
          className="back-btn"
          onClick={() => (window.location.href = "/upload")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (result.notCT) {
    return (
      <div className="result-page">
        <h1 className="result-title invalid">⚠ Invalid Image</h1>

        <div className="invalid-box">
          <p>This does not appear to be a Lung CT scan image.</p>
          <p>Please upload a proper CT scan image for accurate prediction.</p>
        </div>

        <button
          className="back-btn"
          onClick={() => (window.location.href = "/upload")}
        >
          Upload Again
        </button>
      </div>
    );
  }

  return (
    <div className="result-page">
      <h1 className="result-title">Prediction Results</h1>

      <div className="result-grid">
        <div className="result-card">
          <h3>ResNet50</h3>
          <p><strong>Prediction:</strong> {result.resnet.prediction}</p>
          <p><strong>Confidence:</strong> {(result.resnet.confidence * 100).toFixed(2)}%</p>
        </div>

        <div className="result-card">
          <h3>VGG16</h3>
          <p><strong>Prediction:</strong> {result.vgg.prediction}</p>
          <p><strong>Confidence:</strong> {(result.vgg.confidence * 100).toFixed(2)}%</p>
        </div>

        <div className="result-card">
          <h3>InceptionV3</h3>
          <p><strong>Prediction:</strong> {result.inception.prediction}</p>
          <p><strong>Confidence:</strong> {(result.inception.confidence * 100).toFixed(2)}%</p>
        </div>
      </div>

      <button
        className="back-btn"
        onClick={() => (window.location.href = "/upload")}
      >
        Upload Another Scan
      </button>
    </div>
  );
}

export default Result;
