const express = require('express');
require("./db/mongoose")
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=> {
//     console.log(req.method,req.path);
//     if(req.method == 'POST') {
//         res.send('Get req are disable');
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('The site is in maintance');
// })



app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("server is listening at " + port);
})


// const multer = require("multer");
// const upload = multer({
//     destination: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req,file,cd) {
//         if(!file.originalname.match(/\.(txt|txts)$/)) {
//             cd(new Error("Please Upload Text File"));
//         }
//         // cd("File must pe Image");
//         cd(undefined,true);
//         // cd(undefined,false);
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// })
 
// const Task = require("./model/task")
// const User = require("./model/user")

// const main = async () => {
    // const task = await Task.findById("635f9f7f53010ee4dbf38158");
    // await task.populate('owner');
    // console.log(task.owner);

    // const user = await User.findById("635f9e6bdb3b425f5806ff42");
    // await user.populate('tasks');
    // console.log(user.tasks);
// }  
// main() 

// create jwt token
// const jwt = require('jsonwebtoken')
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'mohudhf8375894!@*(@(*!' }, 'thisismynodeapp', { expiresIn : '5 seconds'})
//     console.log(token);
//     let data = jwt.verify(token, 'thisismynodeapp')
//     console.log(data);
// }
// myFunction();

//hash password example
// const bcrypt = require('bcryptjs')
// const myFunction = async ()=> {
//     let pass = 'Mohit@123';
//     let hashPass = await bcrypt.hash(pass,8)
//     console.log(pass);
//     console.log(hashPass);

//     let ismatch = await bcrypt.compare('Mohit@123',hashPass)
//     console.log(ismatch);

// }
// myFunction();