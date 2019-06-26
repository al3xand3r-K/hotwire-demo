class HotelPlannerPage {
  constructor() {}

  get destinationInp() { return $('#txtCity1') }
  get checkInInp() { return $('#CheckInDate1_disp') }
  get checkOutInp() { return $('#CheckOutDate1_disp') }
}

export default new HotelPlannerPage();