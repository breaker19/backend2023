// userRouter.js
import { Router } from 'express';
import { usuarios } from '../models/usuario.mongoose.js';
import { postUsuarios } from '../src/controllers/api/usuarios.controllers.js';

export const userRouter = Router();

userRouter.get('/api/usuarios/', async (req, res) => {
  const verUsuarios = await usuarios.find();
  res.json(verUsuarios);
});

userRouter.post('/api/registro', postUsuarios);

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
