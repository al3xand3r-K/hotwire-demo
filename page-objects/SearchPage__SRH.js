// Search page for Standard Rate Hotels
class SearchPage__SRH {
  constructor() {}

  get standardRateHotelsTab() { return $('product-tabs a.second') }
  get topHotel() { return $('#resultsContainer article:first-of-type') }
  get reserveBtn() { return $('#mock-book-button') }
}

export default new SearchPage__SRH();