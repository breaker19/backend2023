class ProductManager
{
    constructor()
    {
        this.products = [];
    }

    getProducts()
    {
        return this.products;
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

        if(this.products.find(product => product.id === id) === undefined) {
            console.log("El producto no existe");
        } else {
            return this.products.find(product => product.id === id);
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

    constructor(id, name, price, autor, description, category, image)
    {
        this.id = id;
            
        this.name = name;
        this.price = price;
        this.autor = autor;
        this.description = description;
        this.category = category;
        this.image = image;
        this.product = [];
    }
}


const manejarEventos = new ProductManager();

manejarEventos.addProduct(new Product ("La Torre Oscura", 12000,"Stephen King","La Torre Oscura es una saga de libros escrita por el autor estadounidense Stephen King, que incorpora temas de múltiples géneros, incluyendo fantasía, fantasía científica, terror y wéstern. Describe a un pistolero y su búsqueda de una torre, cuya naturaleza es tanto física como metafórica.","Libro","https://images-na.ssl-images-amazon.com/images/I/51ZQYQZQFJL._SX331_BO1,204,203,200_.jpg"));

manejarEventos.addProduct(new Product ("El Hobbit", 10000,"J.R.R. Tolkien","El Hobbit es una novela fantástica escrita por el escritor británico J. R. R. Tolkien y publicada en 1937. Es una historia de aventuras y viajes, que narra la historia de un hobbit llamado Bilbo Bolsón, que emprende un viaje con trece enanos para recuperar el tesoro que les fue robado por el dragón Smaug.","Libro","https://images-na.ssl-images-amazon.com/images/I/51ZQYQZQFJL._SX331_BO1,204,203,200_.jpg"));


console.log(manejarEventos.getProducts()) //devuelve todos los productos y les asigna un id
console.log(manejarEventos.getProduct(1)); //devuelve el producto con id 1
console.log(manejarEventos.getProduct(3));// el producto con id 3 no existe devuelve el error
;













