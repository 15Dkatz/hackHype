myApp.controller('EventsController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL', '$http',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL, $http) {
    

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.eventbriteapi.com/v3/events/search/?q=hackathon&location.latitude=37.77&location.longitude=-122.43&location.within=100mi",
      "method": "GET",
      "headers": {
        "authorization": "Bearer SZRBEN2CGEUPT57YVMXP",
        // "cache-control": "no-cache",
        // "postman-token": "84fc16e0-38d6-f63f-18b4-191718ae35ab"
      }
    }

    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });

    $http({
      method: 'GET',
      url: '/someUrl'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("response", response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });








}]); 
