// usuarios.controllers.js

import { usuarios } from "../../../models/usuario.mongoose.js";

// Controlador para registrar un nuevo usuario
export async function postUsuarios(req, res, next) {
  try {
    const { input_first_name, input_last_name, input_email, input_age, input_password } = req.body;

    const usuarioCreado = await usuarios.create({
      input_first_name: input_first_name,
      input_last_name: input_last_name,
      input_email: input_email,
      input_age: input_age,
      input_password: input_password,  
    });

    req.session.usuarios = {
      input_first_name: usuarioCreado.input_first_name,
      input_last_name: usuarioCreado.input_last_name,
      input_email: usuarioCreado.input_email,
      input_age: usuarioCreado.input_age,
    };

    console.log("ESTO ES UN", usuarioCreado);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    next(error);
  }
}

// Controlador para autenticar un usuario
export async function postLogin(req, res, next) {
  console.log('Controlador postLogin ejecutado')
  try {
    const { input_email, input_password } = req.body;

    // Buscar al usuario en la base de datos por el email
    const usuario = await usuarios.findOne({ input_email: input_email });

    console.log('Usuario encontrado en la base de datos:', usuario);
    console.log('Contraseña ingresada por el usuario:', input_password);

    if (!usuario || usuario.input_password !== input_password) {
      // Si el usuario no existe o la contraseña es incorrecta, retornar un código de estado 401 (No autorizado)
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Si el usuario y la contraseña son correctos, crear una sesión para el usuario
    req.session.usuarios = {
      input_first_name: usuario.input_first_name,
      input_last_name: usuario.input_last_name,
      input_email: usuario.input_email,
      input_age: usuario.input_age,
    };

    console.log('Datos del usuario en la sesión:', req.session.usuarios);

    // Retornar un código de estado 200 (OK) para indicar que el login fue exitoso
    // res.status(200).json({ message: 'Login exitoso', user: req.session.usuarios });

    // En lugar de enviar una respuesta JSON, redirigir a la página de bienvenida
    res.redirect('/bienvenida');
  } catch (error) {
    next(error);
  }
}