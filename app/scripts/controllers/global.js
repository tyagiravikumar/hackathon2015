/**
 * Created by user on 12/27/2014.
 */
'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('globalMapCtrl', function ($scope,$http,$routeParams) {
    //$scope.options = {width: 500, height: 300, 'bar': 'aaa'};
    //$scope.data = [1, 2, 3, 4];

    delete $http.defaults.headers.common['X-Requested-With'];
    $scope.filterLocation = $routeParams.filterString;

    $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
    };
    $scope.barValue = 'None';

    $scope.graphtype =
      [ { name: 'Donut3D', url: 'view/main.html'},
        { name: 'Donut', url: 'donut.html'} ];

    $scope.select = function(location) {
      var array = [];

      array.push(location);
      $scope.selected = location;
      $scope.map.options.bubbles=array;

      $scope.options = {width: 500, height: 300, 'bar': 'aaa'};

      $http.get('http://localhost:5500/employee?{"EMPPSA":"' + $scope.selected.id + '"}'  )
        .success (function(data){
        var lookup = {};
        var items = data;
        for (var item, i = 0; item = items[i++];) {
          var EMPSKILL = item.EMPSKILL;

          if (!(EMPSKILL in lookup)) {
            lookup[EMPSKILL] = 1;
          }
          else
          {
            lookup[EMPSKILL] = lookup[EMPSKILL] + 1;
          }
        }
        var  key;
        var dataArray = [];
        for (key in lookup) {
          if (lookup.hasOwnProperty(key)) {
            var obj = {};
            obj.x = key;
            obj.y = lookup[key];
            dataArray.push(obj);
          }
        }
        $scope.data = dataArray;



        $scope.map.options.bubbles[0].emp = dataArray;


        });
      $scope.barValue = 'None';
};



    $scope.map = {
      type: 'world',
      data: [{
        values: [
          { 'location': 'USA', fillKey:'USA'},
          { 'location': 'CAN', fillKey:'USA'},
          { 'location': 'FRA',  fillKey:'EUR'},
          { 'location': 'RUS',  fillKey:'DUB'},
          { 'location': 'IND',  fillKey:'IND'}
        ]
      }],
      fills:{
        'USA': '#1f77b4',
        'EUR': '#9467bd',
        'DUB': '#ff7f0e',
        'SIN': '#2ca02c',
        'IND': '#e377c2',
        'HNG': '#8c564b',
        'AUS': '#d62728',
        'JAP': '#7f7f7f',
        'THL': '#666666',
        'PHL': '#fafafa',
        defaultFill: '#EDDC4E'
      },
      colors: ['#666666', '#b9b9b9', '#fafafa'],
      options: {
        width: 600,
        //legendHeight: 600, // optionally set the padding for the legend
        legend: false,
        bubbles: $http.get('http://localhost:5500/niitresourses' + '?{"country":"' + $scope.filterLocation + '"}' ).success (function(data){
          $scope.allbubbles =  data;
          $scope.map.options.bubbles = data;
        })
      }
    };

  })
  .directive('barChart', function(){
    var chart = d3.custom.barChart();
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="chart"></div>',
      scope:{
        height: '=height',
        width: '=width',
        data: '=data',
        hovered: '&hovered'
      },
      link: function(scope, element, attrs) {
        var chartEl = d3.select(element[0]);
        chart.on('customHover', function(d, i){
          scope.hovered({args:d});
        });

        scope.$watch('data', function (newVal, oldVal) {
          chartEl.datum(newVal).call(chart);
        });

        scope.$watch('height', function(d, i){
          chartEl.call(chart.height(scope.height));
        });
      }
    };
  })
  .directive('chartForm', function(){
    return {
      restrict: 'E',
      replace: true,
      controller: function AppCtrl ($scope) {
        $scope.update = function(d, i){ $scope.data = randomData(); };
        function randomData(){
          return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
        }
      }/*,
      template: '<div class="form">' +
      'Height: {{options.height}}<br />' +
      '<input type="range" ng-model="options.height" min="100" max="300"/>' +
      '<br />Hovered bar data: {{barValue}}</div>'*/
    };
  }).directive('scroller', function () {
    return {
      restrict: 'A',
      // new
      scope: {
        loadingMethod: '&'
      },
      link: function (scope, elem, attrs) {
        var rawElement = elem[0];
        elem.bind('scroll', function () {
          if((rawElement.scrollTop + rawElement.offsetHeight+5) >= rawElement.scrollHeight){
            scope.$apply(scope.loadingMethod); //new
          }
        });
      }
    };
  });

