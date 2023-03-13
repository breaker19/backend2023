import fs from 'fs/promises'
import { randomUUID } from 'crypto';
import  {Producto} from '../src/fs.js'

export class Cart {

    constructor(ruta) {
        this.ruta = ruta;
    }
    async leerArchivo()  { 
        const json = await fs.readFile(this.ruta, 'utf-8');
        this.producto = JSON.parse(json);
        }
    }

const cart = new Cart('cart.json');

export async function agregarProducto(id, producto) {
    await cart.leerArchivo();
    const carrito = cart.producto.find((carrito) => carrito.id === id);
    if (!carrito) {
      cart.producto.push({ id, productos: [producto] });
    } else {
      carrito.productos.push(producto);
    }
    await cart.guardarArchivo();
  }