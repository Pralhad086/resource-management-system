app.controller('empViewProfileCtrl', function($scope, getEmpFormData) {
  $scope.empFormData = getEmpFormData.get();

  //$scope.emp_full_name = $scope.empFormData.emp_first_name + " " + $scope.empFormData.emp_last_name;

  //$scope.empFormData.push($scope.emp_full_name);

  console.log($scope.empFormData);
});
