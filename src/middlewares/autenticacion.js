
export function autenticacion (req, res, next) {
    if (req.session.usuarios) {
      next()
    } else {
      res.redirect('/register')
    }
  }