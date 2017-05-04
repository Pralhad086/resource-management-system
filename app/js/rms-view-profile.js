app.controller('empViewProfileCtrl', function($scope, getEmpFormData) {
  $scope.empFormData = getEmpFormData.get();
  console.log('List of profile is as below')
  console.log($scope.empFormData);
});
