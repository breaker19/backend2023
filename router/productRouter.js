import express, { query } from 'express'
import  {Producto} from '../src/fs.js'

import { Router } from 'express';
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

 
 

    
   
