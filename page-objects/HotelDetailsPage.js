class HotelDetailsPage {
  constructor() {}

  get bookNowBtn() { return $('a[contextual-book-button]:first-of-type') }
}

export default new HotelDetailsPage();