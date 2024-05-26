const express=require('express'); 
const cors=require('cors') 
const app = express() 
app.use(express.json()); 
app.use(cors()) 
app.get("/",(req,res)=>{ 
 res.send("bonjour"); 
 }); 
const schoolRouter =require("./routes/school.route") 
app.use('/api/school', schoolRouter); 
const courseRouter =require("./routes/course.route") 
app.use('/api/course', courseRouter); 
const studentRouter =require("./routes/student.route") 
app.use('/api/student', studentRouter); 
const teacherRouter =require("./routes/teacher.route") 
app.use('/api/teacher', teacherRouter); 
const classRouter =require("./routes/class.route") 
app.use('/api/class', classRouter); 
 const StudentCourse =require("./routes/studentCourse.route") 
app.use('/api/studentCourse', StudentCourse);  
const contact =require("./routes/contact.route") 
app.use('/api/contact', contact); 

const login =require("./routes/login.route") 
app.use('/api/login', login); 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)) 