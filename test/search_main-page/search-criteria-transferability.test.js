import HomePage from "../../page-objects/HomePage";
import SearchPage from "../../page-objects/SearchPage";
import HotelPlannerPage from "../../page-objects/HotelPlannerPage";
import { getCurrentDate, getDate__nDaysFromNow, switchToTab } from '../../utils/helpers'
import { shouldBeDisplayed } from '../../utils/waits-wrapper'

describe('search criteria parameters are passed correctly', () => {
  it('to the search box at the search results page', () => {
    // save data to avoid test failure due to day change during test run
    let checkInDate = getCurrentDate();
    let checkOutDate = getDate__nDaysFromNow(7)

    HomePage.open()
      .setDestination('Kyiv')
      .setCheckInDate(checkInDate)
      .setCheckOutDate(checkOutDate)
      .setGuests({ rooms: 1, adults: 2, children: 1 })
      .findHotelBtn.click();
    shouldBeDisplayed( SearchPage.topHotel, 'failed to wait for page to load' )
    
    assert.include(SearchPage.destinationInp.getAttribute('value'), 'Kiev');
    assert.equal(SearchPage.checkInInp.getAttribute('value'), checkInDate);
    assert.equal(SearchPage.checkOutInp.getAttribute('value'), checkOutDate);
    assert.equal(SearchPage.guestsInp.getText(), '1 Room, 2 Adults, 1 Child');
  })
  
  it('to the search widget at hotelplanner.com', () => {
    // save data to avoid test failure due to day change during test run
    let checkInDate = getCurrentDate();
    let checkOutDate = getDate__nDaysFromNow(7)

    HomePage.open()
      .setDestination('Kyiv')
      .setCheckInDate(checkInDate)
      .setCheckOutDate(checkOutDate);
    HomePage.guestsInp.click();
    HomePage.setRooms(7);
    HomePage.takeFocusOff.click();
    HomePage.findHotelBtn.click();
    
    switchToTab(1);
    shouldBeDisplayed( HotelPlannerPage.destinationInp, 'failed to wait for page to load' )
    assert.include(HotelPlannerPage.destinationInp.getValue(), 'Kiev');
    assert.equal(HotelPlannerPage.checkInInp.getValue(), checkInDate);
    assert.equal(HotelPlannerPage.checkOutInp.getValue(), checkOutDate);
  })
})