const express= require('express')
const app= express()
const port= 3000
const path= require('path')
const ejsMate= require('ejs-mate')



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
