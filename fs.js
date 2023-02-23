import fs from 'fs/promises'
class Producto {

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

const producto = new Producto('products.txt');
// await producto.mostrarProductos();
// await producto.agregarProductos({id: 15,"producto": "manaos", "precio": 200, "cantidad": 20 });
// await producto.mostrarProductos();

async function progreso(){
    await producto.mostrarProductos();
    await producto.agregarProductos({"id": 8, "producto": "manaos", "precio": 200, "cantidad": 20 })
    

    await producto.mostrarProductos();
    await producto.deleteProducto(3);
    console.log("Producto eliminado");
    await producto.mostrarProductos();

}

progreso();









