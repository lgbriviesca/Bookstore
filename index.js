import { Book, book, bookData, bookFinalPrice } from './bookObjectCreation.js';
import {
  Comic,
  comic,
  comicData,
  comicFinalPrice,
} from './ComicObjectCreation.js';
import { ShoppingCart, cart, addToCart } from './shoppingCart.js';

class CommercialBill {
  /** Inicia la clase del obejeto CommercialBill.
   *
   * Params:
   *
   * bookFinalPrice : un arrray,
   * comicFinalPrice : un array,
   * cart : un objeto
   * */
  constructor(bookFinalPrice, comicFinalPrice, cart) {
    (this.bookFinalPrice = bookFinalPrice),
      (this.comicFinalPrice = comicFinalPrice),
      (this.cart = cart);
    this.finalPrice = this.cart.calcTotal();
  }

  /** Retorna un string que muestra la fecha del momento en que se ejecuta */
  getDate() {
    return new Date(Date.now()).toString();
  }

  /** Retorna un array.
   *
   * En un array retorna la información unitaria de cada objeto.
   * En un array retorna un string por cada elemento agregado,
   * con el título del artículo, información del precio (descuentos
   * o precio coleción) y el precio. En un objeto, el precio total.
   * En un array, objetos con la información fiscal del cliente.
   * En un string, la fecha del momento en que se ejecuta.
   *
   * Params:
   *
   * apellido : un string,
   * nombre : un string,
   * telefono : un entero,
   * id : un string*/
  generateBill(apellido, nombre, telefono, id) {
    return [
      this.comicFinalPrice,
      this.bookFinalPrice,
      this.cart.products,
      { 'Precio final': this.finalPrice },
      [
        { Apellido: apellido },
        { Nombre: nombre },
        { Teléfono: telefono },
        { Identificación: id },
      ],
      this.getDate(),
    ];
  }
}

const bill = new CommercialBill(
  bookFinalPrice,
  comicFinalPrice,
  cart,
  cart.calcTotal()
);

const taxBill = bill.generateBill(
  'Luis',
  'Guerrero',
  55443322,
  '3456HGFDS01000'
);

//console.log(bill);
//console.log(taxBill);
