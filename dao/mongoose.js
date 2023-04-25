import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema;
export const connection = await mongoose.connect("mongodb+srv://sebakarp26:floresycolores@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority");

 const productosMongoose= mongoose.connection.db.collection("products");

// const productoEncontrado= await productosMongoose.findOne()

export const productoSchema = new Schema({
    producto: String,
    precio: Number,});
    const ProductoMongoose = mongoose.model('products', productoSchema);
  
const matchd = await ProductoMongoose.find()
const deleteProducto = await ProductoMongoose.deleteMany({precio: {$gt: 300}});

console.log(matchd)



productoSchema.plugin(mongoosePaginate)
export default ProductoMongoose;