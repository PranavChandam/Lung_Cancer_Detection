import os
import cv2
import numpy as np
from PIL import Image
import statistics

# ============================
# CONFIG — CHANGE THIS PATH
# ============================
DATASET_PATH = r"C:\Users\Pranav\Desktop\LungCancer_MERN\The IQ-OTHNCCD lung cancer dataset"

# We assume CT folders are:
# Benign cases / Malignant cases / Normal cases
VALID_CT_FOLDERS = ["Benign cases", "Malignant cases", "Normal cases"]


# Extract all image paths
def load_image_paths():
    paths = []
    for folder in VALID_CT_FOLDERS:
        full = os.path.join(DATASET_PATH, folder)
        if os.path.exists(full):
            for img in os.listdir(full):
                if img.lower().endswith((".jpg", ".jpeg", ".png")):
                    paths.append(os.path.join(full, img))
    return paths


# Extract CT characteristics
def extract_features(path):
    try:
        img = Image.open(path).convert("RGB")
        img_np = np.array(img)

        # color std
        color_std = float(np.std(img_np))

        # grayscale version
        gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
        gray_std = float(np.std(gray))

        # edge count
        edges = cv2.Canny(gray, 50, 150)
        edge_count = int(np.sum(edges > 0))

        # grayscale difference score (CTs have low difference)
        gray_score = float(np.mean(np.abs(img_np[:, :, 0] - gray)))

        return color_std, gray_std, edge_count, gray_score

    except Exception as e:
        print("Error:", e)
        return None


def main():
    paths = load_image_paths()
    print(f"\n📌 Total CT images found: {len(paths)}")

    color_vals = []
    texture_vals = []
    edge_vals = []
    gray_vals = []

    for p in paths:
        result = extract_features(p)
        if result:
            c, t, e, g = result
            color_vals.append(c)
            texture_vals.append(t)
            edge_vals.append(e)
            gray_vals.append(g)

    # Calculate thresholds
    print("\n========================================")
    print("🔥 LEARNED CT FEATURE THRESHOLDS")
    print("========================================")

    print(f"Color STD range: {min(color_vals):.2f} → {max(color_vals):.2f}")
    print(f"Texture STD range: {min(texture_vals):.2f} → {max(texture_vals):.2f}")
    print(f"Edge Count range: {min(edge_vals)} → {max(edge_vals)}")
    print(f"GrayScore range: {min(gray_vals):.2f} → {max(gray_vals):.2f}")

    print("\n========================================")
    print("🔥 Recommended CT Detection Rule")
    print("========================================")

    print(f"""
color_std BETWEEN {np.percentile(color_vals,5):.2f} AND {np.percentile(color_vals,95):.2f}
texture_std BETWEEN {np.percentile(texture_vals,5):.2f} AND {np.percentile(texture_vals,95):.2f}
edge_count BETWEEN {np.percentile(edge_vals,5)} AND {np.percentile(edge_vals,95)}
gray_score < {np.percentile(gray_vals,95):.2f}
""")

    print("========================================")
    print("Copy these rules into your app.py")
    print("========================================")


if __name__ == "__main__":
    main()
