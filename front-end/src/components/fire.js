import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB3a-nuOQGlHDLfxWtI-Ldp5pjNIhj0LI8",
    authDomain: "educational-web-app-9209d.firebaseapp.com",
    databaseURL: "https://educational-web-app-9209d-default-rtdb.firebaseio.com",
    projectId: "educational-web-app-9209d",
    storageBucket: "educational-web-app-9209d.appspot.com",
    messagingSenderId: "438472092310",
    appId: "1:438472092310:web:9cbb73b29e712b2b1ab0b7",
    measurementId: "G-D2FR4Z38DX"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default fire;
