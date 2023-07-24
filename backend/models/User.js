const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');


const UserSchema = new Schema({
    email :{
        type : String,
        required : true,
        unique : true

    },
    password :{
        type : String,
        required : true,
    }
})


UserSchema.statics.signup = async function(email ,password){
    // console.log("exists");
    if(!email || !password)
        throw Error('email or password is not filled');
    if(!validator.isEmail(email))
        throw Error('Email is not valid');
    if(!validator.isStrongPassword(password))
        throw Error('Password is not strong enough');
    const exists = await this.findOne({email});
    
    // console.log(exists);
    if(exists){
        throw Error('User Already Exists');
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password , salt);

    const user = await this.create({email , password : hash});
    return {email , user};

}

UserSchema.statics.login = async function(email , password){
    if(!email || !password){
        throw Error('email or password is empty');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error("Email is incorrect");
    }

    const passval = await bcrypt.compare(password , user.password);

    if(!passval){
        throw Error('password is not correct');
    }

    return user;
    

}

module.exports = mongoose.model('User' , UserSchema);