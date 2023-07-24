
const Workout = require('../models/Workout.js');
const mongoose = require('mongoose')


const addWorkout = async (req ,res)=>{
    let emptyinp = [];
    if(!req.body.title)
        emptyinp.push('title');
    if(!req.body.load)
        emptyinp.push('load');
    if(!req.body.reps)
        emptyinp.push('reps');
    if(emptyinp.length > 0){
        return res.status(400).json({error : "Please fill all the fields" , emptyinp});
    }
    req.body.user_id = req.user_id._id;
    // console.log(req.user_id);
    try {
        const Workoutobj = await Workout.create(req.body);
        res.status(200).json(Workoutobj);
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const getWorkouts = async(req , res)=>{
    const user_id = req.user_id._id;
    try{
        const Workouts = await Workout.find({user_id}).sort({createdAt : -1})
        if(!Workouts){
            return res.status(404).json({error : "No workouts found"})
        }
        res.status(200).json(Workouts);
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const getWorkout = async(req , res)=>{
    const {id} = req.params;
    
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({error : "No such workout exist yet"});
        const workout = await Workout.findById(id)
        if(!workout){
            return res.status(404).json({error : "No workouts found"})
        }
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const delWorkout = async(req , res)=>{
    const {id} = req.params;
    
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({error : "No such workout exist yet"});
        const workout = await Workout.findByIdAndDelete(id)
        if(!workout){
            return res.status(404).json({error : "No workouts found"})
        }
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const updateWorkout = async(req , res)=>{
    const {id} = req.params;
    
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({error : "No such workout exist yet"});
        const workout = await Workout.findByIdAndUpdate(id , req.body)
        if(!workout){
            return res.status(404).json({error : "No workouts found"})
        }
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    addWorkout,
    getWorkouts,
    getWorkout,
    delWorkout,
    updateWorkout
}