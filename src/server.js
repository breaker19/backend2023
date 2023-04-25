import express, { Router } from 'express'
import { productRouter } from '../router/productRouter.js';
import { engine } from 'express-handlebars'
import { postUsuarios } from './controllers/api/usuarios.controllers.js';
import { registroUsuario } from './controllers/web/registro.controller.js';
import mongoose from 'mongoose';
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';
import { listarProductos } from './controllers/api/listarProductos.js';
import { cartUpdate } from './controllers/api/cartUpdate.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { autenticacion } from './middlewares/autenticacion.js';

 await mongoose.connect(MONGODB_CNX_STR, {

});


const app = express()
app.use("/", productRouter);
app.use(express.static('public'))
app.use(express.json());
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(session({
  secret: '2ffffff',
  resave: true,
  saveUninitialized: true
})); 


app.get('/listados', listarProductos, autenticacion);

app.get('/carrito/:id', cartUpdate);

app.get('/register/', registroUsuario)

app.get('/profile/', autenticacion, (req, res) => {
 res.render('profile', { pageTitle: 'Profile', usuarios: JSON.stringify(req.session.usuarios)})
})
   
app.post('/api/usuarios/', postUsuarios )

const server = app.listen(3004)

server.on('listening', () => {
  console.log('Servidor escuchando en puerto 3004')
})
