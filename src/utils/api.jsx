var Fetch = require('whatwg-fetch');
var rootUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/'
var apiKey = 'api_key=qX92sHKAv7-z98ZDsWk4';

module.exports = window.api = {
  get: function(stockName) {
    return fetch(rootUrl + stockName + '.json?' + apiKey, {
    })
    .then(function(response){
      return response.json()
    })
  }
};
