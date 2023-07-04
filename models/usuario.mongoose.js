import mongoose from 'mongoose';
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';

const { Schema } = mongoose;

await mongoose.connect(MONGODB_CNX_STR)

const usuarioSchema = new Schema({
   
    input_first_name: String ,
    input_last_name: String ,
    input_email:  String,
    input_age: Number ,           
    input_password:  String,
});

//guardar en la coleccion usuarios con todos los datos del usuario
export const usuarios = mongoose.model('usuariosFinal', usuarioSchema);
