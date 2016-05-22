myApp.controller('TipsController', ['$scope', '$rootScope', 'Authentication', 'sharedPosts', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedPosts, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    // $scope.tipsList = "";




    $scope.tipsList = sharedPosts.loadTipsList();



    // $scope.JokesList = sharedPosts.loadJokesList();


    $scope.updateTipsList = function() {
        var tipsList = sharedPosts.getTipsList();
        $scope.tipsList = tipsList;

        return tipsList;
    }


    $scope.addTip = function(newTip) {
        console.log("newTip", newTip);
        var addTip = {
            date: Firebase.ServerValue.TIMESTAMP,
            name: newTip.name,
            votes: 0
        }
        $scope.tipsList.push(addTip);
        sharedPosts.setTipsList($scope.tipsList);

    }

    $scope.addVote = function(tip) {

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

    $scope.removePost = function(firstName, lastName, listType, index) {
        
        var verifyFirstName = sharedPosts.getFirstname();
        var verifyLastName = sharedPosts.getLastname();

        if (firstName == verifyFirstName && lastName == verifyLastName) {
            if (listType === 'give') {
                console.log("removing from give");
                $scope.giveList.splice(index, 1);
                sharedPosts.setGiveList($scope.giveList);
                // $scope.giveList = $scope.updateGiveList();
            }
            else if (listType === 'get') {
                $scope.getList.splice(index, 1);
                sharedPosts.setGetList($scope.getList);
            }
        }
    }

    // change showDelete to a method that toggles shouldShowDelete {
        // showsDelete on posts that have matching names
    // }

    $scope.addPost = function(list) {
        $scope.message = '';
        var match;
        var offering = 'offering';
        // console.log("addPost giveList", $scope.giveList);
        $scope.newPost = {};
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='Write your post here' type='text' ng-model='newPost.text'>"
                           ,
        title: 'Post',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-calm',
            onTap: function(e) {
              if (!$scope.newPost['dollars']||!$scope.newPost['number']) {
                $scope.message = "Please fill in all the fields."
                e.preventDefault();
              } else {

                $scope.newPost.firstName = "Anonymous";
                $scope.newPost.lastName = "Poster";
                if (sharedPosts.getFirstname()) {
                    $scope.newPost.firstName = sharedPosts.getFirstname();
                    $scope.newPost.lastName = sharedPosts.getLastname();
                };
                
                if (list === 'tips') {
                    var newTipsList = sharedPosts.getTipsList();
                    newTipsList.push($scope.newPost);
                    sharedPosts.setTipsList(newGiveList); 
                    $scope.newTipsList = newGiveList;
                    // match = matchPost(list, $scope.updateTipsList(), $scope.newPost);
                    offering = 'needs';  
                }
                else if (list === 'jokes') {
                    var newJokesList = sharedPosts.getJokesList();
                    newJokesList.push($scope.newPost);
                    sharedPosts.setJokesList(newJokesList);
                    $scope.newJokesList = newJokesList;
                    // match = matchPost(list, $scope.updateGiveList(), $scope.newPost);
                }

                $scope.match = match;
                $scope.showAlert = function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Matched with',
                    template:
                            '<strong>' + match['firstName'] + ' ' + match['lastName'] + '</strong> <br>'
                            +  offering + ' $' + match['dollars'] + '<br>'
                            + 'number: ' + '<span ng-href="tel:' + match['number'] + '">' + match['number'] + '</span>',
                    // body:
                        okText: '', // String (default: 'OK'). The text of the OK button.
                        okType: 'button-balanced', // String (default: 'button-positive'). The type of the OK button.
                });

                alertPopup.then(function(res) {
                        console.log("matched with", match);
                    });
                };
                $scope.showAlert();
              } // end of else
            }
          } //end of buttons second argument
         ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });

        $timeout(function() {
           myPopup.close(); 
        }, 30000);
    }
}]); // Controller


// put add anonymous option if not logged in.
// add matching

// phone number and dollar amount mandatory to add!

// why do the poup indents not show two spaces??