import express from 'express'
import { Producto, progreso } from './fs.js'
const app = express()
const producto = new Producto('products.json');

app.get('/productos', async (req, res) => {
    await producto.mostrarProductos();
    res.send(producto.producto) 
})

app.get('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const productoId = await producto.searchById(id);
    res.send(productoId);
  });
















const server = app.listen(3004)
