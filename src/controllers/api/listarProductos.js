import ProductoMongoose from '../../../dao/mongoose.js';
import session from 'express-session';

export async function listarProductos(req, res) {
  try {
    const productosdos = await ProductoMongoose.find().lean();

    // Filtrar productos no deseados
    const productosFiltrados = productosdos.filter(producto => {
      // Aplica aquí tu lógica de filtrado, por ejemplo:
      // Si el producto cumple ciertas condiciones, lo mantienes en la lista
      return producto.precio > 10;
    });

    res.render('productos', { productosdos: productosFiltrados, pageTitle: 'Profile', usuarios: JSON.stringify(req.session.usuarios)});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}