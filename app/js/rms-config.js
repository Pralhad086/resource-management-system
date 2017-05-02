var app = angular.module('rms', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when("/createProfile", {
      templateUrl : "/views/createProfile.html",
      controller: "empCreateProfileCtrl"
  })
  .when("/viewProfile", {
      templateUrl : "/views/viewProfile.html"
  })
  .otherwise({ redirectTo: '/', templateUrl : '/views/chooseView.html'});

  $locationProvider.hashPrefix('');

  }
]);
