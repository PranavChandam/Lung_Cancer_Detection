from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

# ✅ Define available models
MODELS = {
    "advanced": "../Advanced_CNN.keras",
    "basic": "../BasicCNN.keras",
    "resnet": "../ResNet50.keras"
}

# Function to preprocess uploaded image
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))   # adjust to match your model input
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    # ✅ Get model name from request (default: advanced)
    model_name = request.form.get("model", "advanced").lower()
    if model_name not in MODELS:
        return jsonify({"error": f"Invalid model name. Choose from {list(MODELS.keys())}"}), 400

    model_path = MODELS[model_name]

    if not os.path.exists(model_path):
        return jsonify({"error": f"Model file not found: {model_path}"}), 500

    # Load model dynamically
    model = tf.keras.models.load_model(model_path)

    # Preprocess and predict
    file = request.files['file']
    img_array = preprocess_image(file.read())

    prediction = model.predict(img_array)
    result = prediction.tolist()

    return jsonify({
        "model_used": model_name,
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True)
