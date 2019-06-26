import { shouldHaveText } from '../utils/waits-wrapper'

class HomePage {
  constructor() {
    this.path = '/';
  }

  // destination
  get destinationInp() { return $('#farefinder-hotel-destination-input') }
  get destinationFirstMatch() { return $('.farefinder-hotel-destination-input-container .dropdown-menu li:first-of-type') }
  
  // check-in and check-out
  get checkInInp() { return $('.row #farefinder-hotel-startdate-input') }
  get checkOutInp() { return $('.row #farefinder-hotel-enddate-input') }
  
  // guests props
  get guestsInp() { return $('#farefinder-occupant-selector-hotel-input') }
  
  get roomsVal() { return $('farefinder-hotel .rooms-label') }
  get roomsIncrBtn() { return $('farefinder-hotel .farefinder-occupant-selector-dropdown-menu > div:first-of-type .hw-icon-plus') }
  get roomsDecrBtn() { return $('farefinder-hotel .farefinder-occupant-selector-dropdown-menu > div:first-of-type .hw-icon-minus') }
  
  get adultsVal() { return $('farefinder-hotel .adults-label') }
  get adultsIncrBtn() { return $('farefinder-hotel .farefinder-occupant-selector-dropdown-menu > div:nth-of-type(2) .hw-icon-plus')}
  get adultsDecrBtn() { return $('farefinder-hotel .farefinder-occupant-selector-dropdown-menu > div:nth-of-type(2) .hw-icon-minus') }
  
  get childrenVal() { return $('farefinder-hotel .children-label') }
  get childrenIncrBtn() { return $('farefinder-hotel .farefinder-occupant-selector-dropdown-menu > div:nth-of-type(3) .hw-icon-plus') }
  get childrenDecrBtn() { return $('farefinder-hotel .farefinder-occupant-selector-dropdown-menu > div:nth-of-type(3) .hw-icon-minus') }
  
  // general controls
  get findHotelBtn() { return $('#farefinder-hotel-search-button') }
  get errorMsg() { return $('.hw-alert span') }
  get takeFocusOff() { return $('h1.hw-promo-h2') }

  open() {
    browser.url(this.path);
    return this;
  }

  setDestination(destination) {
    this.destinationInp.addValue(destination);
    this.destinationFirstMatch.click();
    return this;
  }

  setCheckInDate(date) {
    this.checkInInp.clearValue();
    this.checkInInp.addValue(date);
    this.destinationInp.click();    // collapse datepicker
    return this;
  }

  setCheckOutDate(date) {
    this.checkOutInp.clearValue();
    this.checkOutInp.addValue(date);
    this.destinationInp.click();    // collapse datepicker
    return this;
  }

  setRooms(newRooms) {
    // get current rooms value, convert it to numeric
    let currentRooms = parseInt(this.roomsVal.getText(), 10);
    
    // if current value is higher than the requested one - increase; else - decrease
    if (currentRooms < newRooms && currentRooms !=newRooms)
      for (let i = newRooms - currentRooms; i > 0; i--)
        this.roomsIncrBtn.click();
    else if (currentRooms != newRooms)
      for (let i = currentRooms - newRooms; i > 0; i--)
        this.roomsDecrBtn.click();

    // wait until all clicks are rendered
    shouldHaveText( this.roomsVal, newRooms, 'roomsVal' );
  }

  setAdults(newAdults) {
    let currentAdults = parseInt(this.adultsVal.getText(), 10);

    if (currentAdults < newAdults && currentAdults != newAdults)
      for (let i = newAdults - currentAdults; i > 0; i--)
          this.adultsIncrBtn.click();
    else if (currentAdults != newAdults)
      for (let i = currentAdults - newAdults; i > 0; i--)
        this.adultsDecrBtn.click();

    shouldHaveText( this.adultsVal, newAdults, 'adultsVal' );
  }
  

  setChildren(newChildren) {
    let currentChildren = parseInt(this.childrenVal.getText(), 10);

    if (currentChildren < newChildren && currentChildren != newChildren)
      for (let i = newChildren - currentChildren; i > 0; i--)
        this.childrenIncrBtn.click();
    else if (currentChildren != newChildren)
      for (let i = currentChildren - newChildren; i > 0; i--)
        this.childrenIncrBtn.click();

    shouldHaveText( this.childrenVal, newChildren, 'childrenVal' );
  }

  /**
   * @param {Object} obj - { rooms: 1, adults: 1, children: 0 }
   */
  setGuests(obj) {
    // reveal the box with guests props
    this.guestsInp.click();
    
    // set props values
    this.setRooms(obj.rooms);
    this.setAdults(obj.adults);
    this.setChildren(obj.children)

    // collapse the box with guests props
    this.takeFocusOff.click();
    return this;
  }
}

export default new HomePage();