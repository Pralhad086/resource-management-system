var app = angular.module('empDataForm', []);
app.controller('empDataFormCtrl', function($scope, $timeout) {
    $scope.emp_pic = "";
    $scope.emp_first_name = "";
    $scope.emp_last_name = "";
    $scope.emp_designation = "";
    $scope.emp_skill = ['Javascript', 'HTML5', 'CSS3', 'Angular JS', 'Backbone JS',
    'Node JS', 'React JS', 'SASS', 'LESS', 'Grunt', 'Gulp', 'bootstrap', 'Jquery'];
    $scope.emp_skill_other = "";
    $scope.emp_email = "";
    $scope.emp_skype_id = "";
    $scope.emp_contact = "";
    $scope.emp_resume = "";

    $scope.user = {};
    $scope.selection = [];

    // Push selection value for selected skills
    $scope.selectedSkills = function selectedSkills(skill) {
        $scope.selection.push(skill);
    };

    $scope.submitForm = function() {
        var data = $scope.user;
        data.emp_Skills = $scope.selection;
        console.log(data);
    }

});
