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
    $scope.emp = {
      name: 'ravi jkjk',
      age:33
    };

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
        var EMPSKILL = item.EMPSKILL;

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
    });



  });
