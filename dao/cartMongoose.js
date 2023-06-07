import mongoose from "mongoose";
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';


const Schema = mongoose.Schema;
await mongoose.connect(MONGODB_CNX_STR);

const cartSchema = new mongoose.Schema({
  productId: String,
  producto: String,
  precio: Number,
  stock: Number,
});


const Cart = mongoose.model('Carts', cartSchema);



export default Cart;
