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
;app.factory("getEmpFormData", function($http, $q) {
    var empList = [];

    function set(data) {
      $http({
        method: 'GET',
        params: data,
        url: '/save'
      }).then(
          function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
    }

    function get() {
      var defer = $q.defer();

      $http({
        method: 'GET',
        url: '/showresource'
      }).then(
          function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          defer.resolve(response.data);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });

      return defer.promise;
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
                  _id: {
                      validators: {
                          stringLength: {
                              min: 2,
                          },
                          notEmpty: {
                              message: "Please provide your employee id"
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
      },
      getValidator: function(){
        return $("#emp-detail-form").data('bootstrapValidator');
      }
  };

  function get() {
      return obj;
  }

  return {
      get: get
  }

});
;app.controller('empViewProfileCtrl', function(getEmpFormData, $scope) {
  getEmpFormData.get().then(function(data){
      $scope.empFormData = data;
      //console.log('List of profile is controller')
      //console.log($scope.empFormData);
  });
});
;$('document').ready(function(){
  console.log('Angular Started');
});
