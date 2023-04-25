import { usuarios } from "../../../models/usuario.mongoose.js"
import  Session  from "express-session"

export async function postUsuarios (req, res, next) {
    console.log(req.body)
 const usuarioCreado =  await usuarios.create(req.body)
   req.session.usuarios = {
   first_name: usuarioCreado.first_name,
   last_name: usuarioCreado.last_name,
   email: usuarioCreado.email,
   age: usuarioCreado.age,
}
res.json(usuarioCreado)
}