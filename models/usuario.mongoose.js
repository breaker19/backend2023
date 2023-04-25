import mongoose, { version } from "mongoose";


const usuarioSchema = new mongoose.Schema({
    first_name: { type: String, required: true, unique:true },
    last_name: { type: String, required: true, unique:true },
    email:  { type: String, required: true, unique:true},
    age: { type: Number, required: true, unique:true },           
    password:  { type: String, required: true, unique:true },
}, {versionKey: false}); 
export const usuarios = mongoose.model('usuarios', usuarioSchema);