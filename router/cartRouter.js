import { Cart } from "../src/cartManager.js";
import { Router } from "express";
import { Producto } from "../src/fs.js";

const cart = new Cart("cart.json");

export const cartRouter = Router();

cartRouter.get("/cart", async (req, res) => {
    await cart.leerArchivo();
    res.send(cart.producto);
    }
);

//al cart.json con id 1 agregarle el producto de products.json con el id que le pasamos por query usando en la ruta cid para identificar el id del cart
cartRouter.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    const { id } = req.query;
    await cart.leerArchivo();
    const carrito = cart.producto.find((carrito) => carrito.id === cid);
    if (!carrito) {
      cart.producto.push({ id: cid, productos: [id] });
    } else {
      carrito.productos.push(id);
    }
    res.send(cart.producto);
  }
);

cartRouter.post("/cart/:cid/:id", async (req, res) => {
    const { cid } = req.params;
    const { id } = req.params;
    await cart.leerArchivo();
    const carrito = cart.producto.find((carrito) => carrito.cid === cid);
    if (!carrito) {
      cart.producto.push({ cid: cid, productos: [id] });
    } else {
      carrito.productos.push(cid);
    }
    res.send(cart.producto);
  }
);