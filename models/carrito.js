
export class cartModel {
#productId
#producto
#precio
#stock
#cart
constructor(productId, producto, precio, stock) {
    this.#productId = productId;
    this.#producto = producto;
    this.#precio = precio;
    this.#stock = stock;
    this.#cart = new Cart({
        productId: this.#productId,
        producto: this.#producto,
        precio: this.#precio,
        stock: this.#stock
      });
}
}



