import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAYVyU1CW6jClLf-ACmygBDqePwEgJyXpw",
    authDomain: "clone-58342.firebaseapp.com",
    databaseURL: "https://clone-58342.firebaseio.com",
    projectId: "clone-58342",
    storageBucket: "clone-58342.appspot.com",
    messagingSenderId: "68589522265",
    appId: "1:68589522265:web:d4a21e3031a28b7b30d048",
    measurementId: "G-EYQJN3NKDN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth(); // it is used to handle all the authentication

export {db,auth};

