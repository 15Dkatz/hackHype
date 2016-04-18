myApp.controller('BoardController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    $scope.giveList = [];
    $scope.getList = [];


    $scope.updateGiveList = function() {
        var giveList = sharedExercises.getGiveList();
        $scope.giveList = giveList;
        return giveList;
    }

    $scope.updateGetList = function() {
        var getList = sharedExercises.getGetList();
        $scope.getList = getList;
        return getList;

    }


    var matchPost = function(listType, list, post) {
        var match;
        var bestMatch = list[0];

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
 
                    if (match['dollars']>bestMatch['dollars']) {
                        bestMatch = match;
                    }
                }
                i++;
            }
        } 
        else if (listType === 'get')
        {
            var i = 0;
            while (i<list.length) {
                if (post['dollars']<=list[i]['dollars']) {
                    console.log(list[i]['dollars'], "found it!");
                    match = list[i];
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
        $scope.message = '';
        var match;
        var offering = 'offering';
        console.log("addPost giveList", $scope.giveList);
        $scope.newPost = {};
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder=' Flexi Dollars' type='number' ng-model='newPost.dollars'>" + 
                  "<input class='inputIndent' placeholder=' Phone Number' type='tel' ng-model='newPost.number'>" + 
                  "{{message}}"
                           ,
        title: 'Post Offer',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-balanced',
            onTap: function(e) {
              if (!$scope.newPost['dollars']||!$scope.newPost['number']) {
                $scope.message = "Please fill in all the fields."
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