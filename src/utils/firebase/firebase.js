import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyBC4lbWtVqRhojoGKn_mKVhgqjDd3i8LOQ",
    authDomain: "send-msg-49cdf.firebaseapp.com",
    databaseURL: "https://send-msg-49cdf.firebaseio.com",
    projectId: "send-msg-49cdf",
    storageBucket: "send-msg-49cdf.appspot.com",
    messagingSenderId: "797120854834",
    appId: "1:797120854834:web:a150af07cbe1006951752b",
    measurementId: "G-ZMLTCTR1MS"
};

firebase.initializeApp(firebaseConfig);
export default firebase