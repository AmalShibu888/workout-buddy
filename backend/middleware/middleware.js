
const jwt =require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const confirmAuth = async (req, res , next)=>{

    // console.log(req.headers.authorization);

    const authorization = req.headers.authorization;
    
    if(!authorization){
        return res.status(401).json("The user is not autherized");
    }
        const token = authorization.split(' ')[1];
    try {
        const {id} = jwt.verify(token , process.env.SECRET);
        req.user_id = await User.findById(id).select('_id');
        console.log(req.user_id);
        next();
    } catch (error) {
        res.status(401).json({error :"token is not accurate"});
    }
}

module.exports =  confirmAuth;