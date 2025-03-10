import mongoose from "mongoose";
 const ProfilePictureSchema=new mongoose.Schema({
    profilePictureUrl:{
        type:String,
        required:true,
    },
    uploadedAt:{
        type:Date,
        default:Date.now,
    },
 });

 export default mongoose.model('ProfilePicture',ProfilePictureSchema);
 