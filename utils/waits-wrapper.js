module.exports = {
  /**
   * 
   * @param {element locator} element 
   * @param {string} errMsg - defaulted to a pre-built string
   * @param {number} timeout - measured in ms; 8000 is default
   */
  shouldBeDisplayed: function(element, errMsg = 'failed to wait for element to become visible', timeout = 8000) {
    browser.waitUntil(() => { return element.isDisplayed() == true }, timeout, errMsg);
  },

  /**
   * wait until given element will have expected value
   * 
   * @param {element locator} element 
   * @param {string} expectedVal 
   * @param {string} elementName - used for building a more informative err msg; default is 'element'
   * @param {number} timeout - measured in ms; 3000 is default
   */
  shouldHaveValue: function(element, expectedVal, elementName = 'element', timeout = 3000) {
      const errMsg = `${elementName} value should be ${expectedVal}, but ${element.getAttribute('value')} is found`
      browser.waitUntil(() => { return element.getAttribute('value') == expectedVal }, timeout, errMsg);
  },

  /**
   * wait until given element will have expected inner text
   * 
   * @param {element locator} element 
   * @param {string} expectedVal 
   * @param {string} elementName - used for building a more informative err msg; default is 'element'
   * @param {number} timeout - measured in ms; 3000 is default
   */
  shouldHaveText: function(element, expectedVal, elementName = 'element', timeout = 3000) {
      const errMsg = `${elementName} text should be ${expectedVal}, but ${element.getText()} is found`
      browser.waitUntil(() => { return element.getText() == expectedVal }, timeout, errMsg);
  },
}