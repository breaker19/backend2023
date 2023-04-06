import mongoose from "mongoose";
import productos from '../products.json' assert { type: 'json' }
const Schema = mongoose.Schema;
const connection = await mongoose.connect("mongodb+srv://sebakarp26:pass@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority");

 const productosMongoose= mongoose.connection.db.collection("products");

const productoEncontrado= await productosMongoose.findOne()

const productoSchema = new Schema({
    producto: String,
    precio: Number,});
    const Producto = mongoose.model('products', productoSchema);

const agregarNuevos = await Producto.insertMany(productos);

const deleteProducto = await Producto.deleteOne({producto: "Agua"});

const updateProducto = await Producto.updateOne({producto: "Coca Cola"}, {$set: {producto: "Pepsi"}});

console.log(updateProducto)


