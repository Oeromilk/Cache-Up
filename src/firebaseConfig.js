import * as firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyBBy5WX8ZCFLi31DlKAdrB6GfEUZwP0xE0",
    authDomain: "cache-up.firebaseapp.com",
    databaseURL: "https://cache-up.firebaseio.com",
    projectId: "cache-up",
    storageBucket: "cache-up.appspot.com",
    messagingSenderId: "54973444615",
    appId: "1:54973444615:web:32e520b59baeca6f7330a2",
    measurementId: "G-N4N6W0J6MM"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;