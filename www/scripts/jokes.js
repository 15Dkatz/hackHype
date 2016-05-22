myApp.controller('JokesController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseArray', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    $scope.jokesList = [];

    $scope.setHearts = function() {
        console.log("running");

        if (ref) {
          ref.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  $scope.jokesList = snapshot.val()["jokesList"];
                  for (var s=0; s<$scope.jokesList.length; s++) {
                    $scope.jokesList[s].loveFill = "ion-ios-heart-outline";
                  }
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
    }



    $scope.addJoke = function(newJoke) {
        // console.log("newJoke", newJoke);
        var addJoke = {
            date: Firebase.ServerValue.TIMESTAMP,
            name: newJoke.name,
            votes: 0,
            loveFill: "ion-ios-heart-outline"
        }
        $scope.jokesList.push(addJoke);
        sharedPosts.setJokesList($scope.jokesList);


    }

    $scope.loved = false;
    var recentTip = null;

    $scope.addVote = function(tip, index) {
        $scope.loveFill = "";
        $scope.loveFill = "";

        if (tip.loveFill == "ion-ios-heart") {
            $scope.loved = true;
        } else {
            $scope.loved = false;
        }

        if ($scope.loved==false) {
            $scope.loved = true;

            console.log("tip name", tip.name, index);

            var votes = tip.votes+1;
            $scope.jokesList[index].votes = votes;
            var tipRef = new Firebase(FIREBASE_URL + "jokesList/" + index);
            tipRef.update({
                "votes": votes
            });

            $scope.jokesList[index].loveFill = "ion-ios-heart";

        } else {
            $scope.loved = false;

            var votes = tip.votes-1;
            $scope.jokesList[index].votes = votes;
            var jokeRef = new Firebase(FIREBASE_URL + "jokesList/" + index);
            jokeRef.update({
                "votes": votes
            });

            $scope.jokesList[index].loveFill = "ion-ios-heart-outline";

        }

        $scope.bubbleSortJokesList();
    }

    $scope.bubbleSortJokesList = function() {

        console.log("attempting sort");

        var swapped;

        var swappedList = $scope.jokesList;

        do {
            swapped = false;
            for (var s=0; s<swappedList.length-1; s++) {
                if (swappedList[s].votes < swappedList[s+1].votes) {
                    var temp = swappedList[s];
                    swappedList[s] = swappedList[s+1];
                    swappedList[s+1] = temp;
                    swapped = true;
                }
            }

        } while (swapped);

        $scope.jokesList = swappedList;
        ref.update({
            "jokesList": $scope.jokesList
        })
    }

}]); // Controller
