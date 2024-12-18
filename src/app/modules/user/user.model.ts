import { Schema, model } from "mongoose";
import { Tuser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<Tuser>({
    id: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: String,
        // required: false
    },
    role:{
        type: String,
        enum: [' admin','student','faculty']
    },
    status:{
        type: String,
        enum: ['in-progress','blocked'],
        default: 'in-progress'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },    
},
    {
        timestamps:true,
    }
)


userSchema.pre('save', async function(next){
    const user= this
    user.password= await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
  
  })
  userSchema.post('save', function(doc, next){

    doc.password="";
    console.log('we saved our data');
  
    next()
  })


export const User= model<Tuser>('User', userSchema)