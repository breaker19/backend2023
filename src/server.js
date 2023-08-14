import express, { Router } from 'express'
import { productRouter } from '../router/productRouter.js';
import { engine } from 'express-handlebars'
import { postLogin, postUsuarios } from './controllers/api/usuarios.controllers.js';
import { registroUsuario } from './controllers/web/registro.controller.js';
import mongoose from 'mongoose';
import { MONGODB_CNX_STR } from '../config/mongoDb.config.js';
import { listarProductos } from './controllers/api/listarProductos.js';
import { cartUpdate} from './controllers/api/cartUpdate.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { autenticacion } from './middlewares/autenticacion.js';
import { cartView, eliminarProductoDelCarrito, eliminarTodosProductoDelCarrito } from './controllers/api/cartView.js';
import { loginView } from './controllers/web/login.controller.js';
import { antenticacionPorGithub_CB, autenticacionPorGithub, passportInitialize, passportSession } from './middlewares/passport.js';
import { githubRouter } from '../router/githubRouter.js';
import  {usuarios}  from '../models/usuario.mongoose.js';
import { userRouter } from '../router/userRouter.js';
import passport from 'passport';
import ticketRouter from '../router/ticketRouter.js';
import sessionConfig from './middlewares/session.js';
import { PORT } from './config.server.js';
 await mongoose.connect(MONGODB_CNX_STR, {

});


const app = express()
app.use("/", productRouter);

app.use("/api/sessions", githubRouter);

app.use("/", ticketRouter);
// app.use("/", githubRouter)
app.use(express.static('public'))
app.use(express.json());
app.use(sessionConfig); 
app.use(session({
  store: MongoStore.create({ mongoUrl: MONGODB_CNX_STR }),
  secret: 'SESSION_SECRET', 
  resave: false,
  saveUninitialized: false
})); 
app.use("/", userRouter)
app.use(passportInitialize, passportSession)
app.use('src/assets/style.css', (req, res, next) => {
  res.setHeader('Content-Type', 'text/css');
  next();
});

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.get('/register/', registroUsuario);


//esperar a que se conecte a la base de datos para luego que se guarden los datos

app.get('/listados/', listarProductos, autenticacion)
app.get('/carrito/', cartUpdate);
app.get('/carrito/:id', cartUpdate);
// app.get('/bienvenida/', (req, res) => {
//   try {
//     // Obtener la información del usuario desde req.session.usuarios
//     const usuario = req.session.usuarios;

//     // Renderizar la vista bienvenida.handlebars y pasar la información del usuario
//     res.render('bienvenida', { pageTitle: 'Bienvenida', usuarios: usuario });
//   } catch (error) {
//     // Manejar errores en caso de que ocurra alguno
//     console.log(error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// });

app.get('/carrito-vista', cartView);
app.get('/login', loginView);
app.post('/api/login/', postLogin)
app.get('/github', autenticacionPorGithub)
app.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => 
{ res.redirect('/')
console.log(req.session)
})

app.get('/register/', registroUsuario)

app.get('/profile/', autenticacion, (req, res) => {
 res.render('profile', { pageTitle: 'Profile', usuarios: JSON.stringify(req.session.usuarios)})
})
// app.get("/api/sessions/githubcallback", (req, res, next) => {
//   console.log(req.session)
//   res.send("ok")
// })
app.get('/carrito/eliminar/:id', eliminarProductoDelCarrito, ); 
app.get('/carrito/eliminar/', eliminarTodosProductoDelCarrito, );
   


app.post('/api/sessions/githubcallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/api/session/githubcallback') })


try {githubRouter}catch (error) { console.log(error)}

app.get('/api/session/githubcallback', (req, res) => {

  res.render('login', { pageTitle: 'login', usuarios: JSON.stringify(req.session.usuarios)
})
})



app.use("/auth", passport.authenticate ("github", {scope: ["user:email"]}))

app.use("/auth/callback", passport.authenticate ("github", {failureRedirect: "/login"}), (req, res) => {
  res.redirect("/")
})





const server = app.listen(PORT, '0.0.0.0', () => { console.log(`escuchando en ${server.address().port}`) })
 
