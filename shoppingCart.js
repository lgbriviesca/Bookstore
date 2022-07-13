import { Book, book, bookData, bookFinalPrice } from './bookObjectCreation.js';
import {
  Comic,
  comic,
  comicData,
  comicFinalPrice,
} from './ComicObjectCreation.js';

class ShoppingCart {
  /** Inicia la clase del objeto ShoppingCart.
   *
   * Params:
   *
   * products : un array vacío por defecto,
   * quantity : un array vacío por defecto*/
  constructor() {
    this.products = [];
    this.quantity = [];
  }

  /** No retorna nada. Agrega al array vacío this.products un string por
   * cada elemento agregado, con el título del artículo, información del
   * precio (descuentos o precio coleción) y el precio.
   *
   * Params:
   *
   * title : un string,
   * amount : entero,
   * price : un entero*/
  addProducts(title, amount, price) {
    this.products.push(...Array(amount).fill(title + price));
  }

  /** No retorna nada.
   *
   * Agrega al array vacío this.quantity array con enteros
   * (precios), cada entero es el precio de cada artículo agregado.
   *
   * Params:
   *
   * amount : entero,
   * price : un entero*/
  addQuantity(amount, price) {
    this.quantity.push(...Array(amount).fill(price[1]));
  }

  /** Retorna un array de strings con los artículos agregados a this.products.*/
  showProducts() {
    return this.products;
  }

  /** Retorna un entero, producto de sumar los valores (enteros) en this.quantity.*/
  calcTotal() {
    return this.quantity
      .map(price => price)
      .reduce((ac, price) => ac + price, 0);
  }

  /** Retorna un string con el entero de this.calcTotal*/
  printTicket() {
    return `Total a pagar: ${this.calcTotal()}`;
  }
}

const cart = new ShoppingCart();

let addToCart = [
  (cart.addQuantity(2, comicFinalPrice),
  cart.addProducts(comic.title, 2, comicFinalPrice)),
  cart.addQuantity(3, bookFinalPrice),
  cart.addProducts(book.title, 3, bookFinalPrice),
];

//console.log(cart.showProducts());
//console.log(cart.calcTotal());
//console.log(cart.printTicket());

export { ShoppingCart, cart, addToCart };
