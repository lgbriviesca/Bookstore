class Book {
  /** Inicia la clase del obejeto Book.
   *
   * Params:
   *
   *  title : un string,
   *  author : un string,
   *  price : un entero,
   *  stock : un entero,
   *  arrival : un sting,
   * */
  constructor(title, author, price, stock, arrival) {
    (this.title = title),
      (this.author = author),
      (this.price = price),
      (this.stock = stock),
      (this.arrival = arrival);
  }

  /** Retorna un string que muestra todos los datos de un objeto libro. */
  getAllData() {
    return `Título: ${this.title}, Autor: ${this.author}, Precio: $${this.price}, Disponibles: ${this.stock}, Fecha de llegada: ${this.arrival}`;
  }

  /** Retorna un entero.
   *
   * El entero representa el precio final con x% descuento en caso
   * de que el libro tenga más de x días de llegada y otro
   * x% en caso de que tenga x días de llegada y haya más de x libros en stock.
   * Si no, un string.
   *
   * Params:
   *
   * today : un string,
   * daysInStock : un entero por defecto,
   * frozenStock : un entero por defecto
   *  */
  bookPriceWithDiscounts(today, daysInStock = 50, frozenStock = 30) {
    let aFecha1 = this.arrival.split('/');
    let aFecha2 = today.split('/');
    let dif =
      Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]) -
      Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    let priceWithDiscounts = undefined;
    if (dias >= daysInStock && this.stock >= frozenStock) {
      priceWithDiscounts = this.price - this.price * 0.5;
    } else if (dias >= daysInStock) {
      priceWithDiscounts = this.price - this.price * 0.3;
    } else priceWithDiscounts = undefined;
    return priceWithDiscounts
      ? ['Descuento aplicado', priceWithDiscounts]
      : ['No hay descuentos', this.price];
  }
}

const book = new Book('El Quijote', 'Cervantes', 350, 40, '10/06/2021');

const bookData = book.getAllData();
const bookFinalPrice = book.bookPriceWithDiscounts('10/06/2021');

//console.log(bookData);
//console.log(bookFinalPrice);

export { Book, book, bookData, bookFinalPrice };
