import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBYRIL1KZFkwurT9BTcraKKjAc88LIQ_ao",
    authDomain: "cc23-group07.firebaseapp.com",
    projectId: "cc23-group07",
    storageBucket: "cc23-group07.appspot.com",
    messagingSenderId: "174421909634",
    appId: "1:174421909634:web:d6694039a6db76442c949b",
    measurementId: "G-TV86JB6J5Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };