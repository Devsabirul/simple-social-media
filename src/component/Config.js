import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCE7Q2NsxVanXXNp6FijwMKSWMnSHwUlUE",
    authDomain: "fd-zoon.firebaseapp.com",
    projectId: "fd-zoon",
    storageBucket: "fd-zoon.appspot.com",
    messagingSenderId: "346902734415",
    appId: "1:346902734415:web:c5d9df774a363675e76c3a"
});

const db = firebase.firestore();
const storage = firebase.storage()
export { firebaseConfig, db, storage };