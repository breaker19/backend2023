import express from 'express';
import { cartView } from '../src/controllers/api/cartView.js';

const ticketRouter = express.Router();

ticketRouter.get('/generar-ticket', async (req, res) => {
  try {
    // Obtener los productos del carrito utilizando la función cartView
    const cartItems = await cartView(req, res);

    // Calcular el monto total del carrito
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.precioTotal;
    }

    // Generar el ticket
    const ticket = {
      items: cartItems,
      totalAmount: totalAmount,
    };

    // Renderizar la plantilla del ticket o enviar los datos como respuesta
    res.render('ticket', { ticket });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
});

export default ticketRouter;