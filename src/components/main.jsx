var React = require('react');
var Header = require('./header');
var Chart = require('./chart');
var StockInput = require('./stockinput');

module.exports = React.createClass({
  render: function() {
    return <div>
      <Header />
      <div className="chartSpot">
      </div>
      <StockInput />
    </div>
  }
})
