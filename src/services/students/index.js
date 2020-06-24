const express = require ("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const { request } = require("http")
const studRouter = express.Router()

const usersFilePath = path.join(__dirname,"students.json")
//1
studRouter.get("/", (req,res)=>{
const fileContent = fs.readFileSync(usersFilePath)
 const studentString = fileContent.toString()
 console.log(studentString)
 res.send(JSON.parse(studentString))
})


//2
studRouter.get("/:id", (req,res) =>{
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    console.log(studentsArray)
    //we filter out the array to get the specified user
   const student= studentsArray.filter(student => student.id === req.params.id)
   console.log(student)
   res.send(student)


})

//3
studRouter.post("/", (req,res)=>{
    console.log(req.body)
    const newStud = {...req.body, id:uniqid()}
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    studentsArray.push(newStud)
    // now we write the new content in to the same file
    fs.writeFileSync(usersFilePath, JSON.stringify(studentsArray))
    res.status(201).send(newStud)
})

//4
studRouter.put("/:id", (req,res)=>{
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray= JSON.parse(fileContent.toString())
    const filteredStudsArray = studentsArray.filter(student =>
        student.id !== req.params.id)
        const student = req.body
        student.id = req.params.id
        filteredStudsArray.push(student)
        fs.writeFileSync(usersFilePath, JSON.stringify(filteredStudsArray))
        res.send(filteredStudsArray)
})

//5
studRouter.delete("/:id", (req,res)=>{
    const fileContent = fs.readFileSync(usersFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    // filter students by excluding the one with specified id
    const filteredStudsArray = studentsArray.filter(student =>{
        student.id !== req.params.id
    })

    // write the filtered content back in to the same file
    fs.writeFileSync(usersFilePath, JSON.stringify(filteredStudsArray))
    res.send(filteredStudsArray)

})


module.exports = studRouter