app.factory('getEmpFormData', function() {
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
