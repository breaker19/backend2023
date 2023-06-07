import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';

const Schema = mongoose.Schema;
await mongoose.connect(MONGODB_CNX_STR);

const productoSchema = new Schema({
  productId: String,
  producto: String,
  precio: Number,
  stock: Number,
});

productoSchema.plugin(mongoosePaginate);

const ProductoMongoose = mongoose.model('Product', productoSchema);

export default ProductoMongoose;