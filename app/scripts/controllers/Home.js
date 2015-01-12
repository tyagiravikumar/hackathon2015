'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('HomeCtrl', function($scope,$location) {
    $scope.firstName = 'John';
    $scope.lastName = 'Doe';
    $scope.filter='';
    $scope.loc='';
    $scope.Setfilter = function(value)
    {
      var sRes=$scope.filter;
      $scope.filter=$('#tagtec').val();
      sRes=$('#tagtec').val(); //Ths is done as model is not updatng.
      var sArr=sRes.split(",");
      //console.log(sArr.length);
      var myArray = new Array();
      for(var i=0;i<sArr.length;)
      {
        if(sArr[i].trim().length!=0) {
          myArray[i] = new Object();
          myArray[i].name = sArr[i];
          myArray[i].sel = true;
        }
        i++;
      }
      $scope.names = myArray;
    };
    $scope.Alterfilter = function()
    {
      /*angular.forEach($scope.filter, function(value){
        value.isChecked = !value.isChecked;
      })*/
      console.log($scope.names);
    };
    $scope.SetLocation = function()
    {
      var sRes=$scope.loc;
      sRes=$('#tagloc').val(); //Ths is done as model is not updatng.
      var sArr=sRes.split(",");
      //console.log(sArr.length);
      var myArray = new Array();
      for(var i=0;i<sArr.length;)
      {
        if(sArr[i].trim().length!=0) {
          myArray[i] = new Object();
          myArray[i].name = sArr[i];
          myArray[i].sel = true;
        }
        i++;
      }
      $scope.locs = myArray;
    };

    $scope.AlterLocation = function()
    {
      //debugger
      /*angular.forEach($scope.loc, function(value){

    })*/

      console.log($scope.locs);
    };
    $scope.ShowOnMap = function() {
      console.log($scope.locs);
      console.log($scope.names);
      var filter='';

      if ($scope.names !== undefined)
      {
        for(var i=0;i<$scope.names.length;i++)
        {
          if($scope.names[i].sel) {
            filter = filter  + $scope.names[i].name + ',';
          }
        }
        filter=  filter.substring(0, filter.length - 1);
      }
      filter = filter  + ':';
      if ($scope.names !== undefined) {
        for ( var j = 0; j < $scope.locs.length; j++) {
          if ($scope.locs[j].sel) {
            filter = filter + $scope.locs[j].name + ',';
          }
        }
        filter=  filter.substring(0, filter.length - 1);
      }

      $location.path('/global/' + filter); // path not hash
    };

  });


