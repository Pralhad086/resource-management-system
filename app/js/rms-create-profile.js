app.controller('empCreateProfileCtrl', function($scope, getEmpFormData, $location, empFormValidation) {
    var formValidator = empFormValidation.get();
    formValidator.setupValidation();

    $scope.user = {};
    $scope.user.emp_skills = [];
    $scope.skill_list = [{label: "Javascript",val: false},
    {label: "HTML5",val: false},
    {label: "CSS3",val: false},
    {label: "Angular JS",val: false},
    {label: "Backbone JS",val: false},
    {label: "Node JS",val: false},
    {label: "React JS",val: false},
    {label: "SASS",val: false},
    {label: "Grunt",val: false},
    {label: "Gulp",val: false},
    {label: "bootstrap",val: false},
    {label: "Jquery",val: false}];


    $scope.submitForm = function() {
      if(formValidator.getValidator().isValid()){
        //add selected skills to user object
        angular.forEach($scope.skill_list, function(obj) {
            if(obj.val === true){
              this.push(obj.label);
            }
        }, $scope.user.emp_skills);

        $scope.user.emp_full_name = $scope.user.emp_first_name + " " + $scope.user.emp_last_name;
        getEmpFormData.set($scope.user);
      }
    }

});
