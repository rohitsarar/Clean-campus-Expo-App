import mongoose from 'mongoose';
  

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user','peon'],
        default:'user'
    },
    resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpireAt: Date,
    
},{timestamps:true});


const UserModel=mongoose.model('user',UserSchema)
export default UserModel;