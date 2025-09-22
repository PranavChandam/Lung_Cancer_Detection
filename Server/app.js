const express= require('express')
const app= express()
const port= 3000
const path= require('path')
const ejsMate= require('ejs-mate')
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });


app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs',ejsMate)

app.listen(port, () => console.log("Node server running on http://localhost:3000"));

app.get('/',(req,res)=>{
  res.send("Lets the skyfall")
})

app.get('/Upload',(req,res)=>{
  res.render('UploadImg.ejs')
})

app.post("/Upload/result", upload.single("scan"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("scan", fs.createReadStream(req.file.path));

    const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
      headers: formData.getHeaders(),
    });

    res.render("Result.ejs", {
      filename: response.data.filename,
      prediction: response.data.prediction,
      confidence: response.data.confidence,
    });
  } catch (err) {
    console.error("Prediction error:", err.message);
    res.send("Error while getting prediction");
  }
});

