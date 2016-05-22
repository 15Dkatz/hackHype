myApp.controller('TipsController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseArray', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    $scope.tipsList = [];

    $scope.setHearts = function() {
        console.log("running");

        if (ref) {
          ref.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  $scope.tipsList = snapshot.val()["tipsList"];
                  for (var s=0; s<$scope.tipsList.length; s++) {
                    $scope.tipsList[s].loveFill = "ion-ios-heart-outline";
                  }

              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
    }



    $scope.addTip = function(newTip) {
        console.log("newTip", newTip);
        var addTip = {
            date: Firebase.ServerValue.TIMESTAMP,
            name: newTip.name,
            votes: 0,
            loveFill: "ion-ios-heart-outline"
        }
        $scope.tipsList.push(addTip);
        sharedPosts.setTipsList($scope.tipsList);


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
            $scope.tipsList[index].votes = votes;
            var tipRef = new Firebase(FIREBASE_URL + "tipsList/" + index);
            tipRef.update({
                "votes": votes
            });

            $scope.tipsList[index].loveFill = "ion-ios-heart";

        } else {
            $scope.loved = false;

            var votes = tip.votes-1;
            $scope.tipsList[index].votes = votes;
            var tipRef = new Firebase(FIREBASE_URL + "tipsList/" + index);
            tipRef.update({
                "votes": votes
            });

            $scope.tipsList[index].loveFill = "ion-ios-heart-outline";

        }

        $scope.bubbleSortTipsList();
    }

    $scope.bubbleSortTipsList = function() {

        console.log("attempting sort");

        var swapped;

        var swappedList = $scope.tipsList;

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

        $scope.tipsList = swappedList;
        ref.update({
            "tipsList": $scope.tipsList
        })
    }

}]); // Controller
