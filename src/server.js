import express, { Router } from 'express'
import { productRouter } from '../router/productRouter.js';
// import { cartRouter } from '../router/cartRouter.js';
import { engine } from 'express-handlebars'
import ProductoMongoose from '../dao/mongoose.js';
import exphbs from 'express-handlebars'
//importar products.json
// import  products  from '../products.json' assert { type: 'json' };


const app = express()
app.use("/", productRouter);
// app.use("/", cartRouter);
// Configurar Handlebars como motor de plantillas con opción de compatibilidad
const hbs = exphbs.create({ compat: true, allowProtoPropertiesByDefault: true });
app.engine('handlebars', hbs.engine);
app.set('views', './views');
app.set('view engine', 'handlebars');


app.get('/listados', async (req, res) => {
  try {
    const productosdos = await ProductoMongoose.find().lean();

    res.render('productos', { productosdos});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
  
});
app.get('/carrito/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const producto = await ProductoMongoose.findById(productId).lean();
    console.log(producto)
    res.render('carrito', { producto }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
});


const server = app.listen(3004)
