import HomePage from './HomePage'

// Search Page for All Hotels
class SearchPage {
  constructor() {}

  get topHotel() { return $('.resultsList > li:first-of-type') }
  get topHotelDestination() { return this.topHotel.shadow$('[data-bdd="subTitle"]') }
  get searchBtn() { return $('[data-bdd="farefinder-hotel-search-button"]') }

  get destinationInp() { return $('#results-farefinder-hotel-destination-input') }
  get destinationFirstMatch() { return $('.dropdown-menu[matches] li:first-of-type') }
  get checkInInp() { return $('.row #results-farefinder-hotel-startdate-input') }
  get checkOutInp() { return $('.row #results-farefinder-hotel-enddate-input') }
  get guestsInp() { return $('#farefinder-occupant-selector-hotel-input') }

  setDestination(destination) {
    this.destinationInp.clearValue();
    this.destinationInp.addValue(destination);
    this.destinationFirstMatch.click();
    return this;
  }
}

export default new SearchPage();