import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2J5a3BOu9JXTAL5o5_GSRIlUTVPQ8txg",
    authDomain: "thenosedivers.firebaseapp.com",
    databaseURL: "https://thenosedivers-default-rtdb.firebaseio.com",
    projectId: "thenosedivers",
    storageBucket: "thenosedivers.appspot.com",
    messagingSenderId: "659380336794",
    appId: "1:659380336794:web:cc2c23a402acea5b2f8723",
    measurementId: "G-GN309B2SFH"
};

var fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default fire;
