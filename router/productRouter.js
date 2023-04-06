import express, { query } from 'express'
import  {Producto} from '../src/fs.js'
import { Router } from 'express';
import mongoose from 'mongoose';
const producto = new Producto('products.json');
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

 
//  productRouter.post('/productos', async (req, res, next) => {
//   //use mongoDb.js to save the product
//   const datos = req.body;
//   const result = await productosDb (datos);
//   res.send(result);
//   next();
// });
    
   
