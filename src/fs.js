import fs from 'fs/promises'
import http from 'http'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker';
faker.locale = 'es';

export class Producto {

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
         async mostrarProductos() {
         await this.leerArchivo();
         console.log(this.producto);
        }
        async agregarProductos(nuevoProducto) {
            await this.leerArchivo();
            this.producto.push(nuevoProducto);
            await this.guardarArchivo();
        }
        async agregarIdsAProductos() {
            await this.leerArchivo();
            this.producto = this.producto.map((producto) => {
              if (!producto.id) {
                return { ...producto, id: randomUUID() };
              }
              return producto;
            });
            await this.guardarArchivo();
          }

        async searchById(id) {
            await this.leerArchivo();
            const producto = this.producto.find((producto) => producto.id === id);
            return producto;
        }
       


        
        async deleteProducto(id) {
            await this.leerArchivo();
            const producto = this.producto.find(producto => producto.id === id);
            if(!producto) {
                console.log("El producto no existe");
            } else {
                const eliminarProducto = this.producto.indexOf(producto);
                this.producto.splice(eliminarProducto, 1);
                await this.guardarArchivo();
            }
        }
    }

    



const producto = new Producto('products.json');

export async function progreso(){
    await producto.mostrarProductos();

//     await producto.agregarProductos({"id": randomUUID()
//     , "producto": faker.commerce.product() , "precio": faker.finance.amount(), "cantidad": 20 }) 
    


  
    

    await producto.mostrarProductos();
    await producto.deleteProducto(3);
    console.log("Producto eliminado");
    await producto.mostrarProductos();
    await producto.agregarIdsAProductos();
    await producto.guardarArchivo();
    await producto.mostrarProductos();
    await producto.searchById();

  }

await progreso();
