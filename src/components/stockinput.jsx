var React = require('react');
var StockInputHeader = require('./stockinputheader');
var List = require('./list');

module.exports = React.createClass ({

  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          Enter Ticker Symbol
        </h2>
      </div>
    </div>
  },
});
