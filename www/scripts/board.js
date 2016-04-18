myApp.controller('BoardController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    // $scope.test = "30$ from Zoe";
    $scope.giveList = [];
    $scope.getList = [];


    // auth.$onAuth(function(authUser) {
    //     updateLists();
    // });



    // var updateLists = function() {
    //     // setTimeout(function() {
    //     //     // var giveList = sharedExercises.getGiveList();
    //     //     // $scope.giveList = giveList;
    //     //     updateGiveList();
    //     //     // var getList = sharedExercises.getGetList();
    //     //     // $scope.getList = getList;
    //     //     updateGetList();
    //     // }, 600);
    //     setTimeout(function() {
    //         // var giveList = sharedExercises.getGiveList();
    //         // $scope.giveList = giveList;
    //         $scope.updateGiveList();
    //         // var getList = sharedExercises.getGetList();
    //         // $scope.getList = getList;
    //         $scope.updateGetList();
    //     }, 1000);
    // }

    $scope.updateGiveList = function() {
        var giveList = sharedExercises.getGiveList();
        $scope.giveList = giveList;
        return giveList;
    }

    $scope.updateGetList = function() {
        var getList = sharedExercises.getGetList();
        $scope.getList = getList;
        // check a console log.
        // console.log("getList from updateGetList", getList);
        return getList;

    }


    var matchPost = function(listType, list, post) {
        var match;
        var bestMatch = list[0];

        // find lowest match first;
        

        if (listType === 'give') {
            for (var l=0; l<list.length; l++) {
            if (list[l]['dollars'] < bestMatch['dollars']) {
                bestMatch = list[l];
            }    
                console.log(list[l]['dollars']);
            }
            var i = 0;
            while (i<list.length) {
                if (post['dollars']>=list[i]['dollars']) {
                    console.log(list[i]['dollars'], "found it ccc!");
                    match = list[i];
                    // i = list.length;   
                    if (match['dollars']>bestMatch['dollars']) {
                        bestMatch = match;
                    }
                }
                i++;
            }
        } 
        else if (listType === 'get')
        {
            // return a givePost
            // console.
            var i = 0;
            while (i<list.length) {
                if (post['dollars']<=list[i]['dollars']) {
                    console.log(list[i]['dollars'], "found it!");
                    match = list[i];
                    // i = list.length;
                    if (match['dollars']>bestMatch['dollars']) {
                        bestMatch = match;
                    }
                }
                i++;
            }
        }
        console.log(bestMatch, "match");
        return bestMatch;
    }

    $scope.addPost = function(list) {
        // popup template for new Exercise
        var match;
        var offering = 'offering';
        console.log("addPost giveList", $scope.giveList);
        $scope.newPost = {};
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder=' Flexi Dollars' type='number' ng-model='newPost.dollars'><input class='inputIndent' placeholder=' Phone Number' type='tel' ng-model='newPost.number'>",
        title: 'Post Offer',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newPost) {
                e.preventDefault();
              } else {

                $scope.newPost.firstName = "anonymous";
                $scope.newPost.lastName = "post";
                if (sharedExercises.getFirstname()) {
                    $scope.newPost.firstName = sharedExercises.getFirstname();
                    $scope.newPost.lastName = sharedExercises.getLastname();
                };
                
                if (list === 'give') {
                    var newGiveList = sharedExercises.getGiveList();
                    newGiveList.push($scope.newPost);
                    sharedExercises.setGiveList(newGiveList); 
                    $scope.newGiveList = newGiveList;
                    match = matchPost(list, $scope.updateGetList(), $scope.newPost);
                    offering = 'needs';  
                }
                else if (list === 'get') {
                    var newGetList = sharedExercises.getGetList();
                    newGetList.push($scope.newPost);
                    sharedExercises.setGetList(newGetList);
                    $scope.newGetList = newGetList;
                    match = matchPost(list, $scope.updateGiveList(), $scope.newPost);
                    // offering = 'offering';  
                }

                // console.log("adding post", list);
                $scope.match = match;
                // if (match) {
                // console.log(attempting mat)
                    $scope.showAlert = function() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Matched with',
                        template:
                                '<strong>' + match['firstName'] + ' ' + match['lastName'] + '</strong> <br>'
                                +  offering + ' $' + match['dollars'] + '<br>'
                                + 'number: ' + '<span ng-href="tel:' + match['number'] + '">' + match['number'] + '</span>'

                        // template: 'It might taste good'
                    });

                    alertPopup.then(function(res) {
                            console.log("POPUP matched with", match);
                        });
                    };
                // }

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

        
        // updateLists();

    
    }




}]); // Controller


// put add anonymous option if not logged in.
// add matching

// phone number and dollar amount mandatory to add!