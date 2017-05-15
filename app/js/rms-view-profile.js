app.controller('empViewProfileCtrl', function(getEmpFormData, $scope) {
  getEmpFormData.get().then(function(data){
      $scope.empFormData = data;
      //console.log('List of profile is controller')
      //console.log($scope.empFormData);
  });
});
