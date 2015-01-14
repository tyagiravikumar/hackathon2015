'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('MainCtrl', function ($scope,$http) {
    $http.get('http://localhost:5500/niitresourses')
      .success (function(data) {
      $scope.NIITLocation = { location : data.length};
    });

    $http.get('http://localhost:5500/employee')
      .success (function(data) {

      $scope.Employee = { count : data.length};

      var lookup = {};
      var items = data;
      var icount = 0;
      for (var item, i = 0; item = items[i++];) {
        var EMPSKILL = item.EMPSKILL.trim().toUpperCase();

        if (!(EMPSKILL in lookup)) {
          lookup[EMPSKILL] = 1;
          icount = icount +1;
        }
        else
        {
          lookup[EMPSKILL] = lookup[EMPSKILL] + 1;
        }
      }
      $scope.Technology = { count : icount};
      var  key;
      var dataArray = [];
      var availableTechnologies = [];
      for (key in lookup) {
        if (lookup.hasOwnProperty(key)) {
          var obj = {};
          obj.x = key;
          obj.y = lookup[key];
          dataArray.push(obj);
          availableTechnologies.push(obj.x);
        }
      }
      $scope.TechnologyDetails = availableTechnologies;

      var emp = {};
      angular.forEach(items, function (d)
      {
        debugger;
        angular.forEach($scope.TechnologyDetails, function (keyTech){
          if(angular.equals(d.EMPSKILL.trim().toUpperCase(), keyTech))
          {
            var obj = {};
            obj.key = key;
            var obj1 = [,];

            obj.value  = d;
            emp.push(obj);
          }
        });
      });
     });


    $scope.resourceData = [
      {
        'key':'SQL',
        'values': [[1,10], [2, 14], [3, 2],[4, 6],[5, 1]]
      },
      {
        'key':'Oracle',
        'values': [ [1,8], [2, 8], [3, 8],[4, 4],[5, 1]]
      },
      {
        'key':'JAVA',
        'values': [ [1,6], [2, 5], [3, 9],[4, 6],[5, 1]]
  },
      {
        'key':'.NET',
        'values': [ [1,4], [2, 1], [3, 1],[4, 16],[5, 1]]
      },
      {
        'key':'ASP',
        'values': [ [1,14], [2, 0], [3, 5],[4, 8],[5, 1]]
      }

    ];

    $scope.location = ['USA','UK','India','France','Dubai'];

    $scope.xAxisTickFormatFunction = function (d){
        return $scope.location[d-1];
    };

    $scope.toolTipContentFunction = function(){
      return function(key, x, y, e, graph) {
        return  'Super New Tooltip' +
          '<b>' + key + '</b>' +
          '<p>' +  y + ' at ' + x + '</p>';
      };
    };
    $scope.xFunction = function(){
      return function(d) {
        return d[0];
      };
    };

    $scope.yFunction = function(){
      return function(d) {
        return d[1];
      };
    };

    var colorArray = ['#ffa500', '#c80032', '#0000ff', '#6464ff'];
    $scope.colorFunction = function(){
      return function(d, i){
        return colorArray[i];
      };
    };

  });
