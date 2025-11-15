from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import tensorflow as tf
import cv2

app = Flask(__name__)

# =====================================
# 🔥 LOAD ALL THREE MODELS ON STARTUP
# =====================================
print("Loading models... Please wait.")

resnet_model = load_model("ResNet50.keras")
vgg_model = load_model("VGG16.keras")
inception_model = load_model("InceptionV3.keras")

print("Models loaded successfully!")

# =====================================
# 🔧 IMAGE PREPROCESSING
# =====================================
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))

    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# =====================================
# 🔍 VALIDATION: CHECK IF IMAGE LOOKS LIKE CT SCAN
# =====================================
# =====================================
# 🔍 STRONG VALIDATION: CHECK IF IMAGE IS CT SCAN
# =====================================
def is_ct_scan(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("L")  # grayscale
        img = np.array(img)

        # Reject too small images
        if img.shape[0] < 200 or img.shape[1] < 200:
            return False

        # Canny Edge Detection
        edges = cv2.Canny(img, 50, 150)

        # Detect circular CT scan region
        circles = cv2.HoughCircles(
            img,
            cv2.HOUGH_GRADIENT,
            dp=1,
            minDist=200,
            param1=50,
            param2=30,
            minRadius=80,
            maxRadius=200
        )

        # If no circle found → Not a CT scan
        if circles is None:
            return False

        return True

    except Exception:
        return False


# =====================================
# 🔥 MAIN ROUTE: PREDICT USING ALL 3 MODELS
# =====================================
@app.route("/predict", methods=["POST"])
def predict_all():
    if "scan" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["scan"]
    image_bytes = file.read()

    if not is_ct_scan(image_bytes):
        return jsonify({"error": "Invalid image. Please upload a real lung CT scan."}), 400

    image = preprocess_image(image_bytes)

    labels = ["Benign", "Malignant", "Normal"]

    # RESNET
    res_pred = resnet_model.predict(image)[0]
    res_idx = int(np.argmax(res_pred))
    res_conf = float(np.max(res_pred))

    # VGG16
    vgg_pred = vgg_model.predict(image)[0]
    vgg_idx = int(np.argmax(vgg_pred))
    vgg_conf = float(np.max(vgg_pred))

    # INCEPTIONV3
    inc_pred = inception_model.predict(image)[0]
    inc_idx = int(np.argmax(inc_pred))
    inc_conf = float(np.max(inc_pred))

    return jsonify({
        "resnet": {
            "prediction": labels[res_idx],
            "confidence": res_conf
        },
        "vgg": {
            "prediction": labels[vgg_idx],
            "confidence": vgg_conf
        },
        "inception": {
            "prediction": labels[inc_idx],
            "confidence": inc_conf
        }
    })

# =====================================
# 🚀 START FLASK SERVER
# =====================================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
