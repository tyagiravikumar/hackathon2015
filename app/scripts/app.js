'use strict';

/**
 * @ngdoc overview
 * @name hackathonApp
 * @description
 * # hackathonApp
 *
 * Main module of the application.
 */
angular
  .module('hackathonApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'datamaps',
    'nvd3'
  ])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when ('/global',{
        templateUrl: 'partial/global.html',
        controller: 'globalMapCtrl'
      })
      .when('/global/:filterString', {
      templateUrl: 'partial/global.html',
      controller: 'globalMapCtrl'
      })
      .when ('/resourceMap',{
      templateUrl: 'partial/resourceMap.html',
      controller: 'ResourceStatsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/home', {
        templateUrl: 'Home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
