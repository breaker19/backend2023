import ProductoMongoose from "../dao/mongoose.js";

import { manajarProductos} from "../ProductManager.js"


const mongooseProducto = new ProductoMongoose('products.json');

const productosNuevos = async () => {
    await mongooseProducto.getProducts();
    console.log("los productos de mongoose", mongooseProducto.producto);
    return mongooseProducto.producto;
  }
  productosNuevos()