import Cart from '../../../dao/cartMongoose.js'
export async function cartView(req, res) {
    try {
      const cartItems = await Cart.find().lean();
      res.render('carrito', { cartItems });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
  }