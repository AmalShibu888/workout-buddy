const express = require('express');
require('dotenv').config();
const app =  express();
const workoutRouter = require('./routes/routes')
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
            app.listen(process.env.PORT , ()=>{
            console.log("listening...");
        })
        console.log("");
    })

// app.use((req,res , next)=>{
//     next();
// })

app.use(express.json())


app.use('/api/workouts' , workoutRouter);

app.use('/api/users' , userRouter);

app.get('/' , (req,res)=>{
    res.json({msg:"hello everyone"})
})