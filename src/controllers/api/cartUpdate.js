import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MONGODB_CNX_STR } from '../../../config/mongoDb.config.js';
import Cart from '../../../dao/cartMongoose.js';
import ProductoMongoose from '../../../dao/mongoose.js';
import { cartView } from './cartView.js';
import mongoose from "mongoose";

// Establece la conexión a la base de datos
await mongoose.connect(MONGODB_CNX_STR, {});

// Crea el store de MongoStore
const store = MongoStore.create({
  mongoUrl: MONGODB_CNX_STR,
});

const app = express();
app.use(session({
  secret: '2ffffff',
  resave: true,
  saveUninitialized: true,
  store: store
}));

export async function cartUpdate(req, res) {
  try {
    const productId = req.params.id;
    const producto = await ProductoMongoose.findById(productId).lean();

    if (!producto) {
      // El producto no existe, puedes manejar el caso de error aquí
      return res.status(404).send('Producto no encontrado');
    }
      
    const cart = new Cart({
      productId: productId,
      producto: producto.producto,
      precio: producto.precio,
      stock: producto.stock
    });

    await cart.save();
    res.redirect('/carrito-vista');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}

 

// Agrega la ruta cartView
app.get('/carrito-vista', cartView);