const express = require("express")
const studRoutes = require('./src/services/students')
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// app.get("/", (req,res)=>{
//     res.send("I love studying")
// })
app.use("/students",studRoutes)

app.listen(3000, () =>{
    console.log("something is runnning on port 3000")
})