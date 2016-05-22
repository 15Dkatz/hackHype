myApp.controller('EventsController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL', '$http', '$http',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL, $http) {
    


    $scope.hackathons = [];

    $scope.searchCity = function(city) {
        $http({
          "async": true,
          "crossDomain": true,
          "url": "https://www.eventbriteapi.com/v3/events/search/?q=hackathon&venue.city=" + city,
          "method": "GET",
          "headers": {
            "authorization": "Bearer SZRBEN2CGEUPT57YVMXP"
          }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("response", response);

            $scope.hackathons = response;

            console.log("success!");
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }


}]); 
