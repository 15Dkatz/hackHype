myApp.controller('TipsController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseArray', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    // var tipsRef = new Firebase("https://hackhype.firebaseio.com/tipsList");
    // $scope.tipsList = "";




    // $scope.tipsList = $firebaseArray(tipsRef);
    $scope.tipsList = [];
    // $scope.tipsList.$loaded().then(function(data) {
    //     $scope.setHearts();
    // })

    // $scope.loveFill = "ion-ios-heart-outline";

    $scope.setHearts = function() {
        console.log("running");
        // for (var t=0; t<$scope.tipsList.length; t++) {
        //     $scope.tipsList[t].loveFill = "ion-ios-heart-outline";
        // }

        // console.log($scope.tipsList);
        // sharedPosts.setTipsList($scope.tipsList);
        if (ref) {
          ref.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  // exerciseList = snapshot.val()["exerciseList"];
                  // firstname = snapshot.val()["firstname"];
                  $scope.tipsList = snapshot.val()["tipsList"];
                  // console.log("exerciseList:", $scope.exerciseList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
    }



    // $scope.updateTipsList = function() {
    // $scope.tipsList = $firebaseArray;
        // var tipsList = $scope.tipsList;
        // return tipsList;
    // }


    $scope.addTip = function(newTip) {
        // console.log($scope.tipsList);
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
    // $scope.loveFill = "ion-ios-heart-outline";
    var recentTip = null;

    // var touched = false;

    $scope.addVote = function(tip, index) {
        $scope.loveFill = "";
        $scope.loveFill = "";
        // if (touched == false) {
        //     console.log("attempting reset");
        //     for (var t=0; t<$scope.tipsList.length; t++) {
        //         $scope.tipsList[t].loveFill = "ion-ios-heart-outline";
        //     }
        // }

        
        // touched = true;

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
            for (var s=0; s<swapped.length-1; s++) {
                if (swappedList[s].votes > swappedList[s+1].votes) {
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
        // update list to swapped list

    }

    


    // var matchPost = function(listType, list, post) {
    //     var match;
    //     var bestMatch = list[0];

    //     if (listType === 'give') {
    //         for (var l=0; l<list.length; l++) {
    //         if (list[l]['dollars'] < bestMatch['dollars']) {
    //             bestMatch = list[l];
    //         }    
    //             console.log(list[l]['dollars']);
    //         }
    //         var i = 0;
    //         while (i<list.length) {
    //             if (post['dollars']>=list[i]['dollars']) {
    //                 console.log(list[i]['dollars'], "found it ccc!");
    //                 match = list[i];
 
    //                 if (match['dollars']>bestMatch['dollars']) {
    //                     bestMatch = match;
    //                 }
    //             }
    //             i++;
    //         }
    //     } 
    //     else if (listType === 'get')
    //     {
    //         var i = 0;
    //         while (i<list.length) {
    //             if (post['dollars']<=list[i]['dollars']) {
    //                 console.log(list[i]['dollars'], "found it!");
    //                 match = list[i];
    //                 if (match['dollars']>bestMatch['dollars']) {
    //                     bestMatch = match;
    //                 }
    //             }
    //             i++;
    //         }
    //     }
    //     console.log(bestMatch, "match");
    //     return bestMatch;
    // }

    $scope.data = {
        listCanSwipe: true



        // post shouldShowDelete
    }

    $scope.toggleShowDelete = function(listType, firstName, lastName) {
        $scope.data.shouldShowDelete = !$scope.data.shouldShowDelete;
        var verifyFirstName = sharedPosts.getFirstname();
        var verifyLastName = sharedPosts.getLastname();


        if (listType === 'give') {
            // go through giveList
            // iterate through giveList
            
            console.log("vfn tsd", verifyFirstName, "vfln", verifyLastName);
            // iterate through list and set post deleteText to true if name matches
            for (var i=0; i<$scope.giveList.length; i++) {
                if ($scope.giveList[i]["firstName"] == verifyFirstName && $scope.giveList[i]["lastName"] == verifyLastName) {
                    $scope.giveList[i]["listProperty"] = "minus-circled button-assertive";
                    // console.log("verified firstName", verifyFirstName, " lastName", verifyLastName);
                } else {
                    // false edit
                    $scope.giveList[i]["listProperty"] = "";
                }
            }

            // sharedPosts.setGiveList($scope.giveList);
        //     // find matching names
        //     // if so, shouldShowDelete
        }
        else if (listType === 'get') {
            // respective get list
            console.log("vfn tsd", verifyFirstName, "vfln", verifyLastName);
            // iterate through list and set post deleteText to true if name matches
            for (var i=0; i<$scope.getList.length; i++) {
                if ($scope.getList[i]["firstName"] == verifyFirstName && $scope.getList[i]["lastName"] == verifyLastName) {
                    $scope.getList[i]["listProperty"] = "minus-circled button-assertive";
                    // console.log("verified firstName", verifyFirstName, " lastName", verifyLastName);
                } else {
                    $scope.getList[i]["listProperty"] = "";
                }
            }


        }
    }

    // $scope.removePost = function(firstName, lastName, listType, index) {
        
    //     var verifyFirstName = sharedPosts.getFirstname();
    //     var verifyLastName = sharedPosts.getLastname();

    //     if (firstName == verifyFirstName && lastName == verifyLastName) {
    //         if (listType === 'give') {
    //             console.log("removing from give");
    //             $scope.giveList.splice(index, 1);
    //             sharedPosts.setGiveList($scope.giveList);
    //             // $scope.giveList = $scope.updateGiveList();
    //         }
    //         else if (listType === 'get') {
    //             $scope.getList.splice(index, 1);
    //             sharedPosts.setGetList($scope.getList);
    //         }
    //     }
    // }

    // change showDelete to a method that toggles shouldShowDelete {
        // showsDelete on posts that have matching names
    // }

}]); // Controller


// put add anonymous option if not logged in.
// add matching

// phone number and dollar amount mandatory to add!

// why do the poup indents not show two spaces??