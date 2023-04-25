import mongoose from "mongoose";


const connection = await mongoose.connect("mongodb+srv://sebakarp26:floresycolores@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority");


const cartSchema = new mongoose.Schema({
  productId: String,
  producto: String,
  precio: Number,
  stock: Number,
});

const Cart = mongoose.model('Carts', cartSchema); // Carts es el nombre de la collection en mongodb




export default Cart;