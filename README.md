# 🫁 Lung Cancer Detection System (MERN + AI + Deep Learning)

A complete intelligent system for detecting **Benign**, **Malignant**, and **Normal** lung conditions from CT-scan images using three deep-learning models:

- **ResNet50**
- **VGG16**
- **InceptionV3**

The system also includes **CT-scan validation**, rejecting non-CT images before they reach the model.

---

## 🚀 Features

### 🔍 AI-Based Lung Analysis
- Predictions from **3 different CNN models**
- Confidence score for each model
- Clear comparison between all models

### 🖼 CT-Scan Validation (Before Prediction)
Rejects invalid images using:
- Grayscale consistency  
- Texture analysis  
- Edge density  
- Circular cross-section detection  

### 🔧 Image Preprocessing Preview
UI displays:
- Original Image  
- Preprocessed (224×224) Image  

### 🌐 Full MERN Stack + AI Server
- React frontend  
- Node.js backend  
- Python Flask AI server  
- MongoDB authentication  

### 🎨 Modern UI
- Clean upload page  
- Result page  
- Loading spinners  

---


---

## 📁 Folder Structure

Project/
│
├── Frontend/
│ └── my-app/
│ ├── src/Components/
│ │ ├── Upload/
│ │ ├── Result/
│ │ ├── Login/
│ │ └── ...
│ ├── App.jsx
│ └── index.jsx
│
├── Server/
│ ├── app.js (Node API)
│ ├── app.py (Flask Model Server)
│ ├── uploads/
│ ├── ResNet50.keras
│ ├── VGG16.keras
│ └── InceptionV3.keras
│
├── Lung.ipynb (Training Notebook)
└── README.md



---

## 🧠 Machine Learning Models

All models are:
- Pretrained on ImageNet  
- Base layers frozen  
- Added custom layers:
  - GlobalAveragePooling / Flatten  
  - Dense(256, relu)  
  - Dropout(0.5)  
  - Dense(3, softmax)

**Classes:**  
✔ Benign  
✔ Malignant  
✔ Normal  

---

## 📦 Tech Stack

### 🔹 **Frontend**
- React.js  
- React Router  
- Custom CSS / Tailwind  

### 🔹 **Backend (Node.js)**
- Express  
- Multer  
- Axios  
- MongoDB + Mongoose  
- Passport.js  

### 🔹 **AI Server (Python)**
- Flask  
- TensorFlow/Keras  
- NumPy  
- OpenCV  
- Pillow  

---




