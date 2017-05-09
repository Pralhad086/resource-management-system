var app = angular.module('rms', ['ngRoute']);

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
;app.controller('empCreateProfileCtrl', function($scope, getEmpFormData, $location, empFormValidation) {
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
;app.factory("getEmpFormData", function() {
    var empList = [];

    function set(data) {
        empList.push(data);
    }

    function get() {
        return empList;
    }

    return {
        set: set,
        get: get
    }

});

app.factory("empFormValidation", function() {
  var obj = {
    setupValidation: function(){
      $(document).ready(function(){
          $("a.view-profile-btn").addClass("disabled"); // Disables visually

          $("#emp-detail-form").bootstrapValidator({
              // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
              feedbackIcons: {
                  valid: "glyphicon glyphicon-ok",
                  invalid: "glyphicon glyphicon-remove",
                  validating: "glyphicon glyphicon-refresh"
              },
              fields: {
                  emp_pic: {
                      validators: {
                          notEmpty: {
                              message: "Please upload your profile picture"
                          }
                      }
                  },
                  emp_first_name: {
                      validators: {
                          stringLength: {
                              min: 2,
                          },
                          notEmpty: {
                              message: "Please provide your first name"
                          }
                      }
                  },
                  emp_last_name: {
                      validators: {
                          stringLength: {
                              min: 2,
                          },
                          notEmpty: {
                              message: "Please provide your last name"
                          }
                      }
                  },

                  emp_designation: {
                      validators: {
                          stringLength: {
                              min: 2,
                          },
                          notEmpty: {
                              message: "Please provide your designation"
                          }
                      }
                  },

                  emp_email: {
                      validators: {
                          notEmpty: {
                              message: "Please provide your email address"
                          },
                          emailAddress: {
                              message: "Please provide a valid email address"
                          }
                      }
                  },

                  emp_skype_id: {
                      validators: {
                          stringLength: {
                              min: 5,
                          },
                          notEmpty: {
                              message: "Please provide your skype ID"
                          }
                      }
                  },

                  emp_contact: {
                      validators: {
                          notEmpty: {
                              message: "Please provide your phone number"
                          },
                          phone: {
                              country: "US",
                              message: "Please provide a vaild phone number with area code"
                          }
                      }
                  },

                  emp_resume: {
                      validators: {
                          notEmpty: {
                              message: "Please upload your resume"
                          }
                      }
                  }

              }
            }).on("success.form.bv", function(e) {
                $("#success_message").slideDown({
                    opacity: "show"
                }, "slow")
                $("#emp-detail-form").data("bootstrapValidator").resetForm();

                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data("bootstrapValidator");

                $("a.view-profile-btn").removeClass("disabled");

            });
        });
      }
  };

  function get() {
      return obj;
  }

  return {
      get: get
  }

});
;app.controller('empViewProfileCtrl', function($scope, getEmpFormData) {
  $scope.empFormData = getEmpFormData.get();
  console.log('List of profile is as below')
  console.log($scope.empFormData);
});
;$('document').ready(function(){
  console.log('Angular Started');
});
