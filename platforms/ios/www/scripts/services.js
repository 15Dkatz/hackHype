myApp.service('sharedPosts', ['FIREBASE_URL', '$rootScope', '$firebaseAuth', function(FIREBASE_URL, $rootScope, $firebaseAuth) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var boardListRef, userRef;
  var firstname, lastname;
  var showLoginContent = true;
  var exTime=0;

  var tipsList = [];
  var jokesList = [];

  auth.$onAuth(function(authUser) {
      if (authUser) {
        boardListRef = new Firebase(FIREBASE_URL);
        if (boardListRef) {
          boardListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  tipsList = snapshot.val()["tipsList"];
                  jokesList = snapshot.val()["jokesList"];
                  // console.log(TipsList, "TipsList");
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
        userRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
       	if (userRef) {
          userRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  // exerciseList = snapshot.val()["exerciseList"];
                  firstname = snapshot.val()["firstname"];
                  lastname = snapshot.val()["lastname"];
                  // console.log("exerciseList:", $scope.exerciseList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
      }
  })

  return {
    // getTipsList: function() {
    //   // return tipsList;
    // },

    loadTipsList: function() {
      tipsListRef = new Firebase(FIREBASE_URL);
      if (tipsListRef) {
          tipsListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  tipsList = snapshot.val()["tipsList"];
                  // JokesList = snapshot.val()["JokesList"];
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
      }
      return tipsList;
    },

    loadJokesList: function() {
      boardListRef = new Firebase(FIREBASE_URL);
      if (boardListRef) {
          boardListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  // TipsList = snapshot.val()["TipsList"];
                  jokesList = snapshot.val()["jokesList"];
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
      }
      return jokesList;
    },

    getJokesList: function() {
      return jokesList;
    },

    getFirstname: function() {
    	return firstname;
    },

    getLastname: function() {
    	return lastname;
    },

    getShowLoginContent: function() {
	 	 return showLoginContent;
  	},

    setTipsList: function(newList) {
      // var tipsListRef = new Firebase(FIREBASE_URL);
      ref.update({"tipsList": newList});
    },

    setJokesList: function(newList) {
      ref.update({"jokesList": newList});
    },

    updateAccountFirstname: function(newFirstname) {
    	userRef.update({"firstname": newFirstname});
    },

    updateAccountLastname: function(newLastname) {
    	userRef.update({"lastname": newLastname});
    },

    updateAccountEmail: function(newEmail) {
    	userRef.update({"email": newEmail});
    },

    // setTipsList: function() {
    // 	return TipsList;
    // },

    setExTime: function(newExtime) {
    	exTime = newExtime;
    }

  }
}])
