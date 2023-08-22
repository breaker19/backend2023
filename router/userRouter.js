// userRouter.js
import { Router } from 'express';
import { usuarios } from '../models/usuario.mongoose.js';
import { postUsuarios, postLogin  } from '../src/controllers/api/usuarios.controllers.js';

export const userRouter = Router();


userRouter.get('/api/usuarios/', async (req, res) => {
  try {
    // Verificar si el usuario tiene el correo electrónico específico
    if (req.session.usuarios && req.session.usuarios.input_email === 'sebakarp26@gmail.com') {
      const verUsuarios = await usuarios.find({}, { input_first_name: 1, input_age: 1, input_email: 1, _id: 0 });;
      res.json(verUsuarios);
    } else {
      res.status(403).json({ message: 'Acceso denegado: Solo los admin pueden ver los usuarios' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});




userRouter.get('/api/login', (req, res) => { 
  const loginUser = req.session.usuarios;
  res.json(loginUser);
});

userRouter.post('/api/registro', postUsuarios);
userRouter.post('/usuarios', postUsuarios);
userRouter.post('/api/login', postLogin);
userRouter.get('/bienvenida', (req, res) => {
  try {
    
    const usuario = req.session.usuarios;
    console.log('Datos del usuario:', usuario); 
    
    res.render('bienvenida', { pageTitle: 'Bienvenida', usuarios: usuario });
  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

userRouter.get('/api/usuarios/mayores/', async (req, res) => {
  const verUsuarios = await usuarios.find({ age: { $gt: 18 } });
  res.json(verUsuarios);
});

userRouter.get('/api/usuarios/menores/', async (req, res) => {
  const verUsuarios = await usuarios.find({ age: { $lt: 18 } });
  res.json(verUsuarios);
});

userRouter.post('/api/usuarios/', async (req, res) => {
  const nuevoUsuario = new usuarios(req.body);
  await nuevoUsuario.save();
  res.json(nuevoUsuario);
});
