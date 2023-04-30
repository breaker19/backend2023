import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';

const Schema = mongoose.Schema;
await mongoose.connect(MONGODB_CNX_STR, {

});

 const productosMongoose= mongoose.connection.db.collection("products");

// const productoEncontrado= await productosMongoose.findOne()

export const productoSchema = new Schema({
    productId: String,
    producto: String,
    precio: Number,
    stock: Number,
});
    const ProductoMongoose = mongoose.model('products', productoSchema);
  
const matchd = await ProductoMongoose.find()
// const deleteProducto = await ProductoMongoose.deleteMany({precio: {$gt: 300}});

console.log(matchd)



productoSchema.plugin(mongoosePaginate)
export default ProductoMongoose;