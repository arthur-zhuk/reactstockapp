var React = require('react');
var Api = require('../utils/api');
var ListItem = require('./list-item');
var ReactFire = require('reactfire');
var List = require('./list');
var StockInputHeader = require('./stockinputheader')

module.exports = React.createClass({
  render: function() {
    return <div>
      {this.createChart()}
    </div>
  },

  createChart: function() {
    //$(function () {
      var seriesOptions = [],
          seriesCounter = 0,
          stockNames = []

          for (var key in this.props.items) {
            stockNames.push(this.props.items[key].text)
          }
          stockNames.pop()

        function createChart() {

          $('.chartSpot').highcharts('StockChart', {

              rangeSelector: {
                  selected: 4
              },

              yAxis: {
                  labels: {
                      formatter: function () {
                          return (this.value > 0 ? ' + ' : '') + this.value + '%';
                      }
                  },
                  plotLines: [{
                      value: 0,
                      width: 2,
                      color: 'silver'
                  }]
              },

              plotOptions: {
                  series: {
                      compare: 'percent'
                  }
              },

              tooltip: {
                  pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                  valueDecimals: 2
              },

              series: seriesOptions
          });
      }

/*
      var justWords = pleaseWork.map(function(stockName) {
          return stockName.tickerName;
      });
*/
      $.each(stockNames, function (i, name) {
          var f = new Date, g = f.getFullYear(), j = (1 == f.getHours().toString().length ? "0" + f.getHours().toString() : f.getHours().toString());
          var apiKey = 'api_key=qX92sHKAv7-z98ZDsWk4';
          var quandlJson = "https://www.quandl.com/api/v3/datasets/WIKI/" + name + ".json?"  + apiKey + "&order=asc&exclude_headers=true&trim_start=" + g + "-01-01&trim_end=" + j;
          $.getJSON(quandlJson, function (datacb) {

              var hiJson = datacb.dataset.data.map(function(d){
                  return [new Date(d[0]).getTime(), d[4]];
              });

              seriesOptions[i] = {
                  name: name,
                  data: hiJson
              };

              // As we're loading the data asynchronously, we don't know what order it will arrive. So
              // we keep a counter and create the chart when all the data is loaded.
              seriesCounter += 1;

              if (seriesCounter === stockNames.length) {
                  createChart();
              }
          });
      })
    }
  //}
})
