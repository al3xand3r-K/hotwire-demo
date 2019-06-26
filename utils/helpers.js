function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

module.exports = {
  getCurrentDate: function() {
    let d = new Date();
    
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
  
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
  
    let year = d.getFullYear();
  
    return `${month}/${day}/${year}`;
  },

  /**
   * returns a date within 'n' days from the current date
   * @param {number} n - numeric value
   */
  getDate__nDaysFromNow: function(n) {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    
    // if there's less than 'n' days left till the end of the month 
    // -> increase month by 1 and recalc current day
    let daysInCurrentMonth = getDaysInMonth( d.getMonth() + 1, d.getFullYear() );

    if (daysInCurrentMonth - day < n) {
      day = n - (daysInCurrentMonth - day)
      month += 1
    }
    
    // input format with '0' is required to get validated by form input
    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    // if current month got increased and now exceeds max 'months per year' val 
    // -> increase year value by 1, set month val to '01'
    if (month == 13) {
      year++
      month = '01'
    }

    return `${month}/${day}/${year}`;
  },

  /**
   * @param {number} index - zero-based numeric value
   */
  switchToTab: function(index) {
    const existingTabs = browser.getWindowHandles();
    browser.switchToWindow(existingTabs[index]);
  },
}