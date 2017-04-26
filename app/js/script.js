console.log('Angular begin');
var app = angular.module('empDataForm', []);
app.controller('empDataFormCtrl', function($scope, $timeout) {
    $scope.emp_pic = "";
    $scope.emp_first_name = "";
    $scope.emp_last_name = "";
    $scope.emp_designation = "";
    $scope.emp_skill = {};
    $scope.emp_email = "";
    $scope.emp_skype_id = "";
    $scope.emp_contact = "";
    $scope.emp_resume = "";

    $scope.user = {};

    $scope.submitForm = function() {
        var data = $scope.user;
        console.log(data);
    }

});
