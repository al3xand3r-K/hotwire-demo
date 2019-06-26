// Search Page for All Hotels
class SearchPage {
  constructor() {}

  get topHotel() { return $('.resultsList > li:first-of-type') }

  get destinationInp() { return $('#results-farefinder-hotel-destination-input') }
  get checkInInp() { return $('.row #results-farefinder-hotel-startdate-input') }
  get checkOutInp() { return $('.row #results-farefinder-hotel-enddate-input') }
  get guestsInp() { return $('#farefinder-occupant-selector-hotel-input') }
}

export default new SearchPage();