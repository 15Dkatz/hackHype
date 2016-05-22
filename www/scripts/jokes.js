myApp.controller('JokesController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseArray', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    var jokesRef = new Firebase(FIREBASE_URL + "jokesList/");
    // $scope.tipsList = "";




    $scope.jokesList = $firebaseArray(jokesRef);
    // $scope.JokesList.$loaded().then(function(data) {
    //     $scope.setHearts();
    // })

    // $scope.loveFill = "ion-ios-heart-outline";

    $scope.setHearts = function() {
        console.log("running");
        for (var t=0; t<$scope.jokesList.length; t++) {
            $scope.jokesList[t].loveFill = "ion-ios-heart-outline";
        }

        console.log($scope.jokesList);
        sharedPosts.setJokesList($scope.jokesList);
    }


    // $scope.JokesList = sharedPosts.loadJokesList();


    $scope.updateJokesList = function() {
        var jokesList = sharedPosts.getJokesList();
        $scope.jokesList = jokesList;

        return jokesList;
    }


    $scope.addJoke = function(newJoke) {
        console.log("newTip", newJoke);
        var newJoke = {
            date: Firebase.ServerValue.TIMESTAMP,
            name: newJoke.name,
            votes: 0,
            loveFill: "ion-ios-heart-outline"
        }
        $scope.jokeList.push(addTip);
        sharedPosts.setJokesList($scope.JokesList);

    }

    $scope.loved = false;
    // $scope.loveFill = "ion-ios-heart-outline";
    var recentTip = null;

    // var touched = false;

    $scope.addVote = function(joke, index) {
        $scope.loveFill = "";
        $scope.loveFill = "";
        // if (touched == false) {
        //     console.log("attempting reset");
        //     for (var t=0; t<$scope.JokesList.length; t++) {
        //         $scope.JokesList[t].loveFill = "ion-ios-heart-outline";
        //     }
        // }

        
        // touched = true;

        if (joke.loveFill == "ion-ios-heart") {
            $scope.loved = true;
        } else {
            $scope.loved = false;
        }

        if ($scope.loved==false) {
            $scope.loved = true;

            console.log("joke name", joke.name, index);

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
            var tipRef = new Firebase(FIREBASE_URL + "jokesList/" + index);
            tipRef.update({
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
            for (var s=0; s<swapped.length-1; s++) {
                if (swappedList[s].votes > swappedList[s+1].votes) {
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
        // update list to swapped list

    }

    // $scope.updateJokesList = function() {
    //     var jokesList = sharedPosts.getJokesList();
    //     $scope.jokesList = jokesList;
    //     return jokesList;

    // }


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