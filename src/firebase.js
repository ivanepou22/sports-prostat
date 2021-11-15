import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyCNht_4AhnM4ppc58CexqPD-dyb9OBi8yo",
    authDomain: "sports-prostat.firebaseapp.com",
    projectId: "sports-prostat",
    storageBucket: "sports-prostat.appspot.com",
    messagingSenderId: "918145934857",
    appId: "1:918145934857:web:56d50c559bf9cd82c43ad8",
    measurementId: "G-5TS7K8Q8XM"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

export { db, auth, storage };
