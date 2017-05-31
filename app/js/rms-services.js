app.factory("getEmpFormData", function($http, $q) {
    var empList = [];

    function set(data) {
      $http.post('/save', data, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
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
