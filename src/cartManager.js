import fs from 'fs/promises'
import { randomUUID } from 'crypto';
import  {Producto} from '../src/fs.js'
import ProductoMongoose from '../dao/mongoose.js'
import { log } from 'console';
export class Cart {

    constructor(ruta) {
        this.ruta = ruta;
    }
    async leerArchivo()  { 
        const json = await fs.readFile(this.ruta, 'utf-8');
        this.producto = JSON.parse(json);
        }
        async guardarArchivo() {
          const json = JSON.stringify(this.producto, null, 2);
          await fs.writeFile(this.ruta, json);
        }
     

        async getproductByCartId(cid) {
            await this.leerArchivo();
            const carrito = this.producto.find((carrito) => carrito.cid === cid);
            return carrito;
          }
    }

   
     
    

const cart = new Cart('cart.json');
const producto = new Producto('products.json');


const agregarProductoAlCarrito = async (cid, id) => {
    await cart.leerArchivo();
    await producto.leerArchivo();
    const carrito = await cart.getproductByCartId(cid);
    const productoAgregado = producto.producto.find((producto) => producto.id === id);
    if (!carrito) {
      cart.producto.push({ cid: cid, producto: [productoAgregado] });
    } 
    await cart.guardarArchivo();
    await Producto.leerArchivo();
    console.log("los productos de mongoose",  Producto.producto)
  };
  agregarProductoAlCarrito()
