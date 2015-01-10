/**
 * Created by Administrator on 08-01-2015.
 */
'use strict';

d3.custom = {};

d3.custom.barChart = function module() {
  var margin = {top: 20, right: 20, bottom: 40, left: 40},
    width = 500,
    height = 500,
    gap = 0,
    ease = 'cubic-in-out';
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover');
  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;
      var x1 = d3.scale.ordinal()
        //.domain(_data.map(function(d){ return d.x; }))
        .rangeRoundBands([0, chartW], 0.1);

      var y1 = d3.scale.linear()
        //.domain([0, d3.max(_data, function(d){ return d.y; })])
        .range([chartH, 0]);
      x1.domain(_data.map(function(d) {  return d.x; }));
      y1.domain([0, d3.max(_data, function(d) { return d.y; })]);

      var xAxis = d3.svg.axis()
        .scale(x1)
        .orient('bottom');

      var yAxis = d3.svg.axis()
        .scale(y1)
        .orient('left');


      var barW = chartW / _data.length;

      if(!svg) {
        svg = d3.select(this)
          .append('svg')
          .classed('chart', true);
        var container = svg.append('g').classed('container-group', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('x-axis-group axis', true);
        container.append('g').classed('y-axis-group axis', true);
      }

      svg.transition().duration(duration).attr({width: width, height: height})
      svg.select('.container-group')
        .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

      svg.select('.x-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .attr({transform: 'translate(0,' + (chartH) + ')'})
        .call(xAxis);

      svg.select('.y-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .call(yAxis);

      var gapSize = x1.rangeBand() / 100 * gap;

      var barW = x1.rangeBand() - gapSize;
      var bars = svg.select('.chart-group')
        .selectAll('.bar')
        .data(_data);

      bars.enter().append('rect')
        .classed('bar', true)
        .attr({x: function(d) { return x1(d.x); },
          width: barW,
          y: function(d) { return y1(d.y); },
          height: function(d) { return chartH - y1(d.y); }
        })
        .on('mouseover', dispatch.customHover);
      bars.transition()
        .duration(duration)
        .ease(ease)
        .attr({
          width: barW,
          x: function(d) { return x1(d.x) + gapSize/2; },
          y: function(d) { return y1(d.y); },
          height: function(d) { return chartH - y1(d.y); }
        });
      bars.exit().transition().style({opacity: 0}).remove();

      duration = 500;

    });
  }
  exports.width = function(_x) {debugger;
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.gap = function(_x) {
    if (!arguments.length) return gap;
    gap = _x;
    return this;
  };
  exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  d3.rebind(exports, dispatch, 'on');
  return exports;
};
