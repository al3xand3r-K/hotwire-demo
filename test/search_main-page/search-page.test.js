import { shouldHaveText, shouldBeDisplayed } from '../../utils/waits-wrapper'
import { getCurrentDate, getDate__nDaysFromNow } from '../../utils/helpers'
import HomePage from '../../page-objects/HomePage';
import SearchPage from '../../page-objects/SearchPage';
import SearchPage__SRH from '../../page-objects/SearchPage__SRH';

describe('can edit search criteria at search page', () => {
  it('all hotels tab', () => {
    HomePage
      .open()
      .setDestination('Odessa')
      .setCheckInDate( getCurrentDate() )
      .setCheckOutDate( getDate__nDaysFromNow(7) )
      .setGuests({ rooms: 1, adults: 1, children: 0 })
      .findHotelBtn.click();
    shouldHaveText(SearchPage.topHotelDestination, 'in Odessa area', 'topHotelDestination');
    SearchPage
      .setDestination('Kyiv')
      .searchBtn.click();
    // topHotelDestination should be 'in Kiev area' after page reload
  })

  it('standard rate hotels tab', () => {
    HomePage
      .open()
      .setDestination('Odessa')
      .setCheckInDate( getCurrentDate() )
      .setCheckOutDate( getDate__nDaysFromNow(7) )
      .setGuests({ rooms: 1, adults: 1, children: 0 })
      .findHotelBtn.click();
    SearchPage__SRH.standardRateHotelsTab.click();
    // shouldHaveText(SearchPage__SRH.topHotelDestination, 'in Odessa area', 'topHotelDestination');
    // SearchPage__SRH
    //   .setDestination('Kyiv')
    //   .searchBtn.click();
    // topHotelDestination should be 'in Kiev area' after page reload
  })
})