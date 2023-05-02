import express, { Router } from 'express'
import { productRouter } from '../router/productRouter.js';
import { engine } from 'express-handlebars'
import { postUsuarios } from './controllers/api/usuarios.controllers.js';
import { registroUsuario } from './controllers/web/registro.controller.js';
import mongoose from 'mongoose';
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';
import { listarProductos } from './controllers/api/listarProductos.js';
import { cartUpdate} from './controllers/api/cartUpdate.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { autenticacion } from './middlewares/autenticacion.js';
import { cartView } from './controllers/api/cartView.js';
import { loginView } from './controllers/web/login.controller.js';
import { antenticacionPorGithub_CB, autenticacionPorGithub, passportInitialize, passportSession } from './middlewares/passport.js';
import { githubRouter } from '../router/githubRouter.js';

 await mongoose.connect(MONGODB_CNX_STR, {

});


const app = express()
app.use("/", productRouter);
// app.use("/", githubRouter)
app.use(express.static('public'))
app.use(express.json());
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(session({
  store: MongoStore.create({ mongoUrl: MONGODB_CNX_STR }),
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: false
})); 
app.use(passportInitialize, passportSession)



app.get('/listados/', listarProductos, autenticacion)
app.get('/carrito/', cartUpdate);
app.get('/carrito/:id', cartUpdate);

app.get('/carrito-vista', cartView);
app.get('/login', loginView);

app.get('/github', autenticacionPorGithub)
app.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/') })

app.get('/register/', registroUsuario)

app.get('/profile/', autenticacion, (req, res) => {
 res.render('profile', { pageTitle: 'Profile', usuarios: JSON.stringify(req.session.usuarios)})
})
   
app.post('/api/usuarios/', postUsuarios )
app.post('/api/login/', loginView)

const server = app.listen(3004)

server.on('listening', () => {
  console.log('Servidor escuchando en puerto 3004')
})
