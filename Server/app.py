from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import cv2

app = Flask(__name__)

print("Loading models... Please wait.")

resnet_model = load_model("ResNet50.keras")
vgg_model = load_model("VGG16.keras")
inception_model = load_model("InceptionV3.keras")

print("Models loaded successfully!")

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def is_ct_scan(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        np_img = np.array(img)

        # Channels
        r = np_img[:, :, 0].astype(float)
        g = np_img[:, :, 1].astype(float)
        b = np_img[:, :, 2].astype(float)

        # Metrics
        color_std = (r.std() + g.std() + b.std()) / 3
        gray = cv2.cvtColor(np_img, cv2.COLOR_RGB2GRAY)
        texture_std = gray.std()

        edges = cv2.Canny(gray, 30, 100)
        edge_count = int(np.sum(edges > 0))

        # Grayscale similarity
        grayscale_score = (
            np.mean(np.abs(r - g)) +
            np.mean(np.abs(g - b)) +
            np.mean(np.abs(b - r))
        ) / 3

        
        # print("Color STD:", color_std)
        # print("Texture STD:", texture_std)
        # print("Edges:", edge_count)
        # print("GrayScore:", grayscale_score)
        # print("=================================")

        # FINAL STRICT RULES
        if (
            color_std > 65 and
            texture_std > 65 and
            20000 < edge_count < 80000 and
            grayscale_score < 5         # ← STRICTER NOW
        ):
            return True
        else:
            return False

    except Exception as e:
        print("Error:", e)
        return False






@app.route("/predict", methods=["POST"])
def predict_all():
    if "scan" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["scan"]
    image_bytes = file.read()

    # 🔴 Reject here if not CT → models will NOT run
    if not is_ct_scan(image_bytes):
        return jsonify({
            "error": "This does not look like a lung CT scan. Please upload a valid CT image."
        }), 400

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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
