import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";
require("firebase/auth");

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCuN6JJ921ntcalJbwqibMMtYnSlboEFSs",
    authDomain: "job-tracker-18edb.firebaseapp.com",
    databaseURL: "https://job-tracker-18edb.firebaseio.com",
    projectId: "job-tracker-18edb",
    storageBucket: "job-tracker-18edb.appspot.com",
    messagingSenderId: "243732888455",
    appId: "1:243732888455:web:b28a112f19aa93e3843122",
    measurementId: "G-X6N7VH6Y1Y"
  });
  
  // Initialize Firebase
  
  export default firebaseConfig;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
