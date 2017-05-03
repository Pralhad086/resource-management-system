$(document).ready(function() {
  $('#emp-detail-form').bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
          emp_pic: {
              validators: {
                  notEmpty: {
                    message: 'Please upload your profile picture'
                  }
              }
          },
          emp_first_name: {
              validators: {
                      stringLength: {
                      min: 2,
                  },
                      notEmpty: {
                      message: 'Please provide your first name'
                  }
              }
          },
           emp_last_name: {
              validators: {
                   stringLength: {
                      min: 2,
                  },
                  notEmpty: {
                      message: 'Please provide your last name'
                  }
              }
          },

          emp_designation: {
             validators: {
                  stringLength: {
                     min: 2,
                 },
                 notEmpty: {
                     message: 'Please provide your designation'
                 }
             }
         },

          emp_email: {
              validators: {
                  notEmpty: {
                      message: 'Please provide your email address'
                  },
                  emailAddress: {
                      message: 'Please provide a valid email address'
                  }
              }
          },

          emp_skype_id: {
              validators: {
                  stringLength: {
                     min: 5,
                 },
                  notEmpty: {
                      message: 'Please provide your skype ID'
                  }
              }
          },

          emp_contact: {
              validators: {
                  notEmpty: {
                      message: 'Please provide your phone number'
                  },
                  phone: {
                      country: 'US',
                      message: 'Please provide a vaild phone number with area code'
                  }
              }
          },

          emp_resume: {
              validators: {
                  notEmpty: {
                    message: 'Please upload your resume'
                  }
              }
          }

          // emp_skill: {
          //     validators: {
          //           stringLength: {
          //             min: 2
          //         },
          //         notEmpty: {
          //             message: 'Please provide a skill of your profile'
          //         }
          //         }
          //     }
          }
      })
      .on('success.form.bv', function(e) {
          $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
              $('#emp-detail-form').data('bootstrapValidator').resetForm();

          // Prevent form submission
          e.preventDefault();

          // Get the form instance
          var $form = $(e.target);

          // Get the BootstrapValidator instance
          var bv = $form.data('bootstrapValidator');

          // Use Ajax to submit form data
          // $.post($form.attr('action'), $form.serialize(), function(result) {
          //     console.log(result);
          // }, 'json');
      });
});
;var app = angular.module('rms', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when("/createProfile", {
      templateUrl : "/views/createProfile.html",
      controller: "empCreateProfileCtrl"
  })
  .when("/viewProfile", {
      templateUrl : "/views/viewProfile.html",
      controller: "empViewProfileCtrl"
  })
  .otherwise({ redirectTo: '/', templateUrl : '/views/chooseView.html'});

  $locationProvider.hashPrefix('');

  }
]);
;app.controller('empCreateProfileCtrl', function($scope, getEmpFormData, $location) {
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
        var empList = [];
        empList.push(empData);
        getEmpFormData.set(empList);
        //console.log(empData);
        $location.path("viewProfile");
    }

});
;app.factory('getEmpFormData', function() {
 var empFormSaveData = {}
 function set(data) {
   empFormSaveData = data;
 }
 function get() {
  return empFormSaveData;
 }

 return {
  set: set,
  get: get
 }

});
;app.controller('empViewProfileCtrl', function($scope, getEmpFormData) {
  $scope.empFormData = getEmpFormData.get();

  //$scope.emp_full_name = $scope.empFormData.emp_first_name + " " + $scope.empFormData.emp_last_name;

  //$scope.empFormData.push($scope.emp_full_name);

  console.log($scope.empFormData);
});
;console.log("Angular Started");
