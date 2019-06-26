import HomePage from "../../page-objects/HomePage";
import SearchPage from "../../page-objects/SearchPage";
import { getDate__nDaysFromNow } from "../../utils/helpers"
import { errors } from "../../resources/errors";

describe('search widget fields behave correctly', () => {
  it('can book a hotel for a period of 30 days max', () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setCheckOutDate(getDate__nDaysFromNow(30))
      .setGuests({ rooms: 1, adults: 1, children: 0 })
      .findHotelBtn.click();
    assert.equal(SearchPage.topHotel.isDisplayed(), true);
  })

  it("can't book a hotel for a period of over 30 days", () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setCheckOutDate(getDate__nDaysFromNow(31))
      .setGuests({ rooms: 1, adults: 1, children: 0 })
      .findHotelBtn.click();
    assert.equal(HomePage.errorMsg.getText(), errors.bookingPeriodExceeded)
  })

  it('destination is required', () => {
    HomePage
      .open()
      .destinationInp.clearValue();
    HomePage.findHotelBtn.click();
    assert.equal(HomePage.errorMsg.getText(), errors.destinationIsEmpty)
  })
})

describe('guests properties behave correctly', () => {
  it("at least 1 room is required; children number can't be lower than 0", () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setGuests({ rooms: 1, adults: 3, children: 0 })
      .guestsInp.click();
    assert.equal(HomePage.roomsDecrBtn.isEnabled(), false, 'roomsDecrBtn should be disabled');
    assert.equal(HomePage.childrenDecrBtn.isEnabled(), false, 'childrenDecrBtn should be disabled');
  })

  it('4 person per room max', () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setGuests({ rooms: 2, adults: 8, children: 0 })
      .guestsInp.click();
    assert.equal(HomePage.adultsIncrBtn.isEnabled(), false, 'adultsIncrBtn should be disabled');
    assert.equal(HomePage.adultsDecrBtn.isEnabled(), true, 'adultsDecrBtn should be enabled');
    assert.equal(HomePage.childrenIncrBtn.isEnabled(), false, 'childrenIncrBtn should be disabled');
    assert.equal(HomePage.childrenDecrBtn.isEnabled(), false, 'childrenDecrBtn should be disabled');
  })

  it('at least 1 adult per room is required', () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setGuests({ rooms: 2, adults: 2, children: 4 });
    assert.equal(HomePage.adultsIncrBtn.isEnabled(), true, 'adultsIncrBtn should be enabled');
    assert.equal(HomePage.adultsDecrBtn.isEnabled(), false, 'adultsDecrBtn should be disabled');
    assert.equal(HomePage.childrenIncrBtn.isEnabled(), true, 'childrenIncrBtn should be disabled');
    assert.equal(HomePage.childrenDecrBtn.isEnabled(), true, 'childrenDecrBtn should be disabled');
  })
  
  it('number of guests is decreased automatically once number of rooms is decreased', () => {
    // if current number of guests exceeds max number of guests for a 'new' rooms value;
    // number of children is decreased first
    HomePage
      .open()
      .setDestination('Kyiv')
      .setGuests({ rooms: 4, adults: 10, children: 6 });
    HomePage.guestsInp.click();
    HomePage.setRooms(3);
    assert.equal(HomePage.adultsVal.getText(), 10, 'adultsVal should be 10');
    assert.equal(HomePage.childrenVal.getText(), 2, 'childrenVal should be 1');

    // if there are no children left - number of adults is decreased
    HomePage.setRooms(2);
    assert.equal(HomePage.adultsVal.getText(), 8, 'adultsVal should be 8');
    assert.equal(HomePage.childrenVal.getText(), 0, 'childrenVal should be 0');
  })

  it('adults and children props disappear once rooms val is set to 7', () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .guestsInp.click();
    
    HomePage.setRooms(7);
    assert.equal(HomePage.guestsInp.getText(), '7+ Rooms');
    assert.equal(HomePage.adultsIncrBtn.isDisplayed(), false, "adults prop shouldn't be displayed");
    assert.equal(HomePage.childrenIncrBtn.isDisplayed(), false, "children prop shouldn't be displayed");
    
    HomePage.setRooms(6);
    assert.equal(HomePage.guestsInp.getText(), '6 Rooms, 7 Adults, 0 Children');
    assert.equal(HomePage.adultsIncrBtn.isDisplayed(), true, "adults prop should be displayed");
    assert.equal(HomePage.childrenIncrBtn.isDisplayed(), true, "children prop should be displayed");
  })
})
