from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)   # ✅ allows requests from Node (3000)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "Server", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "Flask is running. Use POST /predict to analyze scans."

@app.route("/predict", methods=["POST"])
def predict():
    if "scan" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["scan"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Dummy model output
    result = "Positive"

    return jsonify({
        "success": True,
        "filename": file.filename,
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
