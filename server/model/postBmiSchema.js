import mongoose from "mongoose";
import moment from 'moment';



const postBMISchema =mongoose.Schema({
    bmi:{
        type: String
    },
    email:{
        type:String
    },
    measuredDate:{
        type: String,
        default: moment().format('ll')
    }
})

const post = mongoose.model('Measured_BMi', postBMISchema)
export default post;