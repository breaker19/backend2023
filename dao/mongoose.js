import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema;
const connection = await mongoose.connect("mongodb+srv://sebakarp26:floresycolores@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority");

 const productosMongoose= mongoose.connection.db.collection("products");

// const productoEncontrado= await productosMongoose.findOne()

export const productoSchema = new Schema({
    producto: String,
    precio: Number,});
    const ProductoMongoose = mongoose.model('products', productoSchema);
  
// const agregarNuevos = await Producto.insertMany(productos);

// const deleteProducto = await Producto.deleteOne({producto: "Agua"});

// const updateProducto = await Producto.updateOne({producto: "Coca Cola"}, {$set: {producto: "Pepsi"}});



// const match = await ProductoMongoose({$match : {producto: "Coca Cola"}})
// console.log(match)
//ver todos los productos
const matchd = await ProductoMongoose.find()
console.log(matchd)



productoSchema.plugin(mongoosePaginate)
export default ProductoMongoose;