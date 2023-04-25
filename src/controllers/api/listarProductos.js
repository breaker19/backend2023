import ProductoMongoose from '../../../dao/mongoose.js';
import session from 'express-session';

export async function listarProductos  (req, res) {
    try {
      const productosdos = await ProductoMongoose.find().lean();
  
      res.render('productos', { productosdos, pageTitle: 'Profile', usuarios: JSON.stringify(req.session.usuarios)});
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
    
  }