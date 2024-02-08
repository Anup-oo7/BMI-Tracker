import mongoose from "mongoose";

const bmi_userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
    },

    verified:{
        type:Boolean,
        default:false,
        required: true

    }
   
})

const user = mongoose.model('BMI-user',bmi_userSchema)

export default user;