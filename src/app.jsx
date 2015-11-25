var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Api = require('./utils/api');
var Chart = require('./components/chart');
var Main = require('./components/main');
var List = require('./components/list');
var StockInputHeader = require('./components/stockinputheader');
var rootUrl = 'https://amber-inferno-6452.firebaseio.com/'

var stockChart = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="panel-body">
      <Main />
      <StockInputHeader itemsStore={this.firebaseRefs.items} />
      <hr />
      <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
        <List items={this.state.items} />
        {this.deleteButton()}
      </div>
      <Chart items={this.state.items} />
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
          Remove checked entries
        </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(stockChart, {});
React.render(element, document.querySelector('.container'));
