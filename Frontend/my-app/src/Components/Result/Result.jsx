import "./Result.css";

function Result() {
  const result = JSON.parse(localStorage.getItem("modelResults"));

  if (!result) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>No results found. Please upload an image first.</h2>
        <a href="/">Go Back</a>
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
        onClick={() => (window.location.href = "/")}
      >
        Upload Another Scan
      </button>
    </div>
  );
}

export default Result;
