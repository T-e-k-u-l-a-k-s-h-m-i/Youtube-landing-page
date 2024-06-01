import  express  from "express"; 
import mongoose from "mongoose";

import bodyParser from "body-parser";
import cors from "cors";
import student from "./models/student.js";


const app = express(); 

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// Mongo db connection
mongoose.connect('mongodb+srv://cinnateku:I4Bwob1eMnE85A5f@cluster0.lso6ftp.mongodb.net/?retryWrites=true&w=majority')


// app.listen(5000)

.then(() => app.listen(5000))
.then(() =>
console.log("Connected to Database & Listining to localhost 5000")
)
.catch((err) => console.log(err));



// To Test server
// app.use("/api", (req, res, next)=>{ 
//     res.send("hi hello") 
//     }) 



// to add data api
app.post('/api/adddata', (req, res, next)=>{
    console.log(req.body)
 const {name,roll,email} = req.body;
 
 const stud = new student({
    name,
    roll,
    email
 })

 stud.save()
 return res.status(200).json({message: "success"})
})




// GET data API
app.get('/api/getTrainees',async (req, res, next)=>{
    let students;
    
        students = await student.find();
    
    if(!students){
        return res.status(404).json({message: "No Students Found."})
    }
    return res.status(200).json({students})
})

// delete student
app.delete('/api/deletestudent/:_id',async (req, res, next)=>{

    const id=req.params._id

console.log

    let student_delete;
    try{
        student_delete= await student.findByIdAndDelete({_id:id})
    }
    catch(err)
    {
        return console.log(err)
    }
    
    if(!student_delete){
        return res.status(400).json({message: "unable to delete."})
    }

    return res.status(200).json({message: "deleted."})

})

//edit student data
app.get('/api/get_student_data/:id', async (req, res, next)=>{
    const _id = req.params.id
    let student_data;
    try{
        student_data = await student.findById({_id});
    }catch(err){
        return console.log(err)
    }
    if(!student_data){
        return res.status(400).json({message:"No student Found."})
    }
    return res.status(201).json({student_data})
})



// update form by id
app.put('/api/edit_student/:id', async (req, res, next)=>{
    const studentid = req.params.id
    const {name, roll, email} = req.body;
    let students;
    try{
        students = await student.findByIdAndUpdate(studentid,{
            name,
            roll,
            email
        });
    }catch(err){
        return console.log(err)
    }
    if(!students){
        return res.status(400).json({message:"Unable to update the Students."})
    }
    return res.status(200).json({students})
})
// end edit user
// Login Account
app.post('/api/login-user', async (req, res, next)=>{
    const {email, name} = req.body;
    let existingUser;
    try{
        existingUser = await student.findOne({email:email,name:name});
    }catch(err){
        return console.log(err)
    } 

    
    if(!existingUser){
        return res.status(401).json({message:"No student Found."})
    }
    else{
        return res.status(200).json({message:"Login Succesful."})
    }
    
 
})