import { usuarios } from "../../../models/usuario.mongoose.js";

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
console.log("ESTO ES UN",usuarioCreado);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    next(error);
  }
}
