import ProductoMongoose from "./dao/mongoose.js";
class ProductManager
{
    constructor()
    {
        this.products = [];
    }

    async getProducts(options = {}) {
        const products = await ProductoMongoose.getProducts(options)
        return products
      
      
      }

    addProduct(product)
    {
        this.products.push(product);
        if(this.products.length > 0) {
            product.id = this.incrementId();
        }
    }


    getProduct(id)
    {        
const compararId = this.products.find(product => product.id === id)
        if(!compararId) {
            
            return "El producto no existe"
        } else {
            return compararId;
        }

    }
        incrementId()
    {
        let id = 0;
        this.products.map(product => {
            if (product.id > id) {
                id = product.id;
            }
        });
        return id + 1;
    }

    
}
class Product
{

    constructor(id, libro, price, autor, description, category, image)
    {
    this.id = id;
    this.libro = libro;
    this.price = price;
    this.autor = autor;
    this.description = description;
    this.category = category;
    this.image = image;
    }
}


const manajarProductos = new ProductManager();

manajarProductos.addProduct



console.log(manajarProductos.getProducts()) //devuelve todos los productos y les asigna un id
console.log(manajarProductos.getProduct(1)); //devuelve el producto con id 1
console.log(manajarProductos.getProduct(3));// el producto con id 3 no existe devuelve el error
;

export { manajarProductos}












