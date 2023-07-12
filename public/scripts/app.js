angular.module('medicineStoreApp', [])
  .controller('PrescriptionController', ['$scope', '$http', function($scope, $http) {
    $scope.prescription = {};
    $scope.showSuccessMessage = false;
    
    $scope.submitPrescription = function() {
      $http.post('/api/savePrescription', $scope.prescription)
        .then(function(response) {
          // Handle success
          console.log('Prescription submitted successfully');
          $scope.showSuccessMessage = true;
          // Reset the form
          $scope.prescription = {};
        })
        .catch(function(error) {
          // Handle error
          console.error('Error submitting prescription:', error);
        });
    };
  }]);

