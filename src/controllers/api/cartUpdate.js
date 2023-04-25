import exphbs from 'express-handlebars'
import Cart from '../../../dao/cartMongoose.js';
import ProductoMongoose from '../../../dao/mongoose.js';

export async function cartUpdate  (req, res) {
  try {
    const productId = req.params.id;
     const producto = await ProductoMongoose.findById(productId).lean();
      const cart = new Cart({
        productId: productId,
        producto: producto.producto,
        precio: producto.precio,
        cantidad: producto.cantidad,
      
      });
      await cart.save();
      res.render('carrito', { producto });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}