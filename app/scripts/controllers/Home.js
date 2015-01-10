'use strict';

/**
 * @ngdoc function
 * @name hackathonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackathonApp
 */
angular.module('hackathonApp')
  .controller('HomeCtrl', function($scope) {
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
      console.log (myArray);
    };
    $scope.Alterfilter = function(value)
    {
      angular.forEach($scope.filter, function(value){
        debugger;
        value.isChecked = !value.isChecked;
      })
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
    $scope.AlterLocation = function(value)
    {
      angular.forEach($scope.loc, function(value){
        debugger;
        value.isChecked = !value.isChecked;
      })
      console.log($scope.locs);
    };
  });


