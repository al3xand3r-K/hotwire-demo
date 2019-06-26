import HomePage from '../page-objects/HomePage'
import SearchPage from '../page-objects/SearchPage';
import SearchPage__SRH from '../page-objects/SearchPage__SRH';
import HotelDetailsPage from '../page-objects/HotelDetailsPage'
import CheckoutPage from '../page-objects/CheckoutPage'
import { getCurrentDate, getDate__nDaysFromNow, switchToTab } from '../utils/helpers'
import { shouldBeDisplayed } from '../utils/waits-wrapper'

describe('happy path', () => {
  it("can book a hotel, 'all hotels' search", () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setCheckInDate( getCurrentDate() )
      .setCheckOutDate( getDate__nDaysFromNow(7) )
      .setGuests({ rooms: 1, adults: 1, children: 0 })
      .findHotelBtn.click();
    SearchPage.topHotel.click();
    switchToTab(1);   // hotel details page opens in a new tab
    HotelDetailsPage.bookNowBtn.click();
    assert.equal(CheckoutPage.cardNumberInp.isDisplayed(), true);
    // complete the checkout process
  })

  it("can book a hotel, 'standard rate hotels' search", () => {
    HomePage
      .open()
      .setDestination('Kyiv')
      .setCheckInDate( getCurrentDate() )
      .setCheckOutDate( getDate__nDaysFromNow(7) )
      .setGuests({ rooms: 1, adults: 1, children: 0 })
      .findHotelBtn.click();
    shouldBeDisplayed( SearchPage.topHotel, 'failed to wait for page to load' );
    SearchPage__SRH.standardRateHotelsTab.click();
    shouldBeDisplayed( SearchPage__SRH.topHotel, 'topHotel is not displayed' );
    SearchPage__SRH.topHotel.click();
    switchToTab(1);   // hotel details page opens in a new tab
    shouldBeDisplayed( SearchPage__SRH.reserveBtn, 'failed to wait for page to load' );
    // go through the booking process
    // then complete the checkout process
  })
})