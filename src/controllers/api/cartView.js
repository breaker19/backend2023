import Cart from '../../../dao/cartMongoose.js';

export async function cartView(req, res) {
  try {
    const cartItems = await Cart.aggregate([
      {
        $group: {
          _id: '$productId',
          producto: { $first: '$producto' },
          precio: { $first: '$precio' },
          stock: { $first: '$stock' },
          cantidad: { $sum: 1 },
          precioTotal: { $sum: '$precio' },
          subtotal: { $sum: { $multiply: ['$precio', '$cantidad'] } },
          
        },
      },
    ]);

    res.render('carrito', { cartItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}
export async function eliminarProductoDelCarrito(req, res) {
  try {
    const productId = req.params.id; // ObjectId del producto
    await Cart.deleteOne({ productId }); // Eliminar el producto del carrito usando el ObjectId
    res.redirect('/carrito-vista');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}