import express, { query } from 'express'
import  {Producto} from '../src/fs.js'
import { Router } from 'express';
import mongoose from 'mongoose';
const producto = new Producto('products.json');
import ProductoMongoose from '../dao/mongoose.js'

export const productRouter = Router();

productRouter.get('/productos', async (req, res) => {
        await producto.mostrarProductos();
        res.send(producto.producto) 
    })

    productRouter.get('/productos/:id', async (req, res) => {
    const productoId = await producto.searchById(id);
    res.send(productoId);
    
  });

  productRouter.delete('/productos/:id', async (req, res) => {
    
    const productoId = await producto.searchById(id);
    res.send(productoId);
    
    });
//mostrar en la url /todos los productos que se ven con el archivo mongoose.js
productRouter.get("/todos", async (req, res) => {
  try {
    const productos = await ProductoMongoose.find(); // Obtener todos los productos utilizando el modelo Producto
    res.status(200).json(productos); // Enviar los productos como respuesta en formato JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

productRouter.get('/productosFiltrados', async (req, res) => {
  //obtener los productos con precio mayor a 1000
  try {
    const productos = await ProductoMongoose.find({precio: {$gt: 600}}); // Obtener todos los productos utilizando el modelo Producto
    res.status(200).json(productos); // Enviar los productos como respuesta en formato JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});
 
//  productRouter.post('/productos', async (req, res, next) => {
//   //use mongoDb.js to save the product
//   const datos = req.body;
//   const result = await productosDb (datos);
//   res.send(result);
//   next();
// });
    
   
