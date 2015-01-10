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
  .controller('globalMapCtrl', function ($scope) {
    $scope.graphtype =
      [ { name: 'Donut3D', url: 'view/main.html'},
        { name: 'Donut', url: 'donut.html'} ];

    $scope.select = function(location) {
      var array = [];
      array.push(location);
      $scope.selected = location;
      $scope.map.options.bubbles=array;
    };



    $scope.map = {
      type: 'world',
      data: [{
        values: [
          { 'location': 'USA', fillKey:'USA'},
          { 'location': 'CAN', fillKey:'USA'},
          { 'location': 'FRA',  fillKey:'FRA'},
          { 'location': 'RUS',  fillKey:'RUS'},
          { 'location': 'IND',  fillKey:'IND'}
        ]
      }],
      fills:{
        'USA': '#1f77b4',
        'RUS': '#9467bd',
        'PRK': '#ff7f0e',
        'PRC': '#2ca02c',
        'IND': '#e377c2',
        'GBR': '#8c564b',
        'FRA': '#d62728',
        'PAK': '#7f7f7f',
        defaultFill: '#EDDC4E'
      },
      colors: ['#666666', '#b9b9b9', '#fafafa'],
      options: {
        width: 500,
        legendHeight: 600, // optionally set the padding for the legend
        legend: true,
        bubbles: [{
          name: 'Joe 4',
          radius: 6,
          yeild: 400,
          country: 'IND',
          fillKey: 'IND',
          significance: 'First fusion weapon test by the USSR (not "staged")',
          date: '1953-08-12',
          latitude: 21.00,
          longitude: 78.00
        },{
          name: 'RDS-37',
          radius: 40,
          yeild: 1600,
          country: 'USSR',
          fillKey: 'RUS',
          significance: 'First "staged" thermonuclear weapon test by the USSR (deployable)',
          date: '1955-11-22',
          latitude: 50.07,
          longitude: 78.43

        },{
          name: 'Tsar Bomba',
          radius: 75,
          yeild: 50000,
          country: 'USSR',
          fillKey: 'RUS',
          significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
          date: '1961-10-31',
          latitude: 73.482,
          longitude: 54.5854
        }]
      }
    };
    $scope.allbubbles = [{
      name: 'Joe 4',
      radius: 6,
      yeild: 400,
      country: 'IND',
      fillKey: 'IND',
      significance: 'First fusion weapon test by the USSR (not "staged")',
      date: '1953-08-12',
      latitude: 21.00,
      longitude: 78.00
    },{
      name: 'RDS-37',
      radius: 40,
      yeild: 1600,
      country: 'USSR',
      fillKey: 'RUS',
      significance: 'First "staged" thermonuclear weapon test by the USSR (deployable)',
      date: '1955-11-22',
      latitude: 50.07,
      longitude: 78.43

    },{
      name: 'Tsar Bomba',
      radius: 75,
      yeild: 50000,
      country: 'USSR',
      fillKey: 'RUS',
      significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
      date: '1961-10-31',
      latitude: 73.482,
      longitude: 54.5854
    }];
  });

