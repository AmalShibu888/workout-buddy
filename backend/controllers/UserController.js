const Users = require('../models/User');

const jwt = require('jsonwebtoken');

const createToken = (id) =>{
    return jwt.sign({id} , process.env.SECRET , {expiresIn:'3d'});
}

const loginFun = async (req , res)=>{
    const {email , password} = req.body;
    // console.log(email , password);
    try{
        // console.log(email , password);
        const user = await Users.login(email , password);
        // console.log(user.user._id);
        const token = createToken(user._id);
        res.status(200).json({user , token});
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const SignupFun = async (req , res)=>{
    // console.log(req.body);
    // req.body = JSON.parse(req.body);
    const {email , password} = req.body;
    // console.log(email , password);
    try{
        // console.log(email , password);
        const user = await Users.signup(email , password);
        // console.log(user.user._id);
        const token = createToken(user.user._id);
        res.status(200).json({user , token});
    }catch(error){
        res.status(400).json({error : error.message})
    }

    // res.json({message : "Signup successfull"});
}

module.exports = {loginFun , SignupFun};