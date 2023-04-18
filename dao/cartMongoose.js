import mongoose from "mongoose";


const connection = await mongoose.connect("mongodb+srv://sebakarp26:floresycolores@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority");


const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  stock: { type: Number, default: 1 },
  producto : { type: String, required: true },
    precio : { type: Number, required: true },
});

const Cart = mongoose.model('Carts', cartSchema);

export default Cart;