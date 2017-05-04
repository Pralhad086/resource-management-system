app.controller('empCreateProfileCtrl', function($scope, getEmpFormData, $location, empFormValidation) {
    var formValidator = empFormValidation.get();
    formValidator.setupValidation();
    
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
    var empData = $scope.user;
    var empFullName;
    // Push selection value for selected skills
    $scope.selectedSkills = function selectedSkills(skill) {
        $scope.selection.push(skill);
    };

    $scope.submitForm = function() {
        empData.emp_Skills = $scope.selection;
        empFullName = empData.emp_first_name + " " + empData.emp_last_name;
        empData.emp_full_name = empFullName;
        getEmpFormData.set(empData);
    }

});
