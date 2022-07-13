import { Book, book, bookData, bookFinalPrice } from './bookObjectCreation.js';

class Comic extends Book {
  /** Inicia la clase del objeto Comic, que se extiende de la clase Book.
   *
   * Se llama la superclase (clase padre).
   *
   * Params:
   *
   * illustrators : un array*/
  constructor(title, author, price, stock, arrival, illustrators) {
    super(title, author, price, stock, arrival);
    this.illustrators = illustrators;
  }

  /** Retorna un string que muestra todos los datos de un objeto comic.
   *
   * Un string que contiene los datos heredados del método de la clase padre
   * y los de la clase hija.*/
  getAllData() {
    return `${super.getAllData()}, Ilustradores: ${this.illustrators}`;
  }

  /** Retorna un array con un string y un entero.
   *
   * Método heredado de la superclase. Se vuelve a llamar porque se usará en
   * los métodos posteriores de esta clase.
   *
   * Params:
   *
   * today : un string*/
  bookPriceWithDiscounts(today) {
    return super.bookPriceWithDiscounts(today);
  }

  /** Implementa un condicional que retorna un array con un string y un entero.
   *
   * El string informa si el entero representa el precio final con x% añadido
   * en caso de que el comic tenga más de x días de llegada o el x% en caso de
   * que tenga x días de llegada y haya menos de x comics en stock. Si no se cumple
   * ninguna de las anteriores condiciones, el string informará que el precio es normal.
   *
   * Params:
   * today : un string,
   * daysInStock : un entero por defecto,
   * hotStock : un entero por defecto,
   * collectorsStock : un entero por defecto,
   * collectorDaysInStock : un entero por defecto*/
  ComicWithCollectionPrice(
    today,
    daysInStock = 10,
    hotStock = 5,
    collectorsStock = 3,
    collectorDaysInStock = 365
  ) {
    let aFecha1 = this.arrival.split('/');
    let aFecha2 = today.split('/');
    let dif =
      Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]) -
      Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    let priceWithHighValue = undefined;
    if (dias <= daysInStock && this.stock <= hotStock) {
      priceWithHighValue = this.price + this.price * 0.3;
    } else if (dias >= collectorDaysInStock && this.stock <= collectorsStock) {
      priceWithHighValue = this.price + this.price * 0.5;
    } else priceWithHighValue = undefined;
    return priceWithHighValue
      ? ['Precio de colección aplicado', priceWithHighValue]
      : ['Precio normal', this.price];
  }

  /** Retorna un array con un string y un entero.
   *
   * Implementa un condicional que: en caso de haber precio de colección,
   * anula cualquier decuento y retorna el string notificando el precio de colección
   * y el entero precio de colección; en caso de no haberlo, toma el precio del
   * método this.ComicWithCollectionPrice (busca si hay descuentos) y retorna
   * el string notificando si se aplicó o no descuento y el entero (precio).
   *
   * Params:
   *
   * today : un string*/
  comicFinalPriceFunc(today) {
    if (
      this.ComicWithCollectionPrice(today)[0] == 'Precio de colección aplicado'
    ) {
      return this.ComicWithCollectionPrice(today);
    } else if (
      this.ComicWithCollectionPrice(today)[0] == 'Precio normal' &&
      this.bookPriceWithDiscounts(today)[0] == 'Descuento aplicado'
    ) {
      return this.bookPriceWithDiscounts(today);
    } else return this.ComicWithCollectionPrice(today);
  }
}

const comic = new Comic('The Killing Joke', 'A.M', 150, 20, '10/06/2021', [
  'B.B',
  'J.K. Rowlling',
]);

const comicData = comic.getAllData();
const comicFinalPrice = comic.comicFinalPriceFunc('10/06/2021');

//console.log(comicData);
//console.log(comicFinalPrice);

export { Comic, comic, comicData, comicFinalPrice };
