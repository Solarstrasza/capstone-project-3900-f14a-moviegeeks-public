// React script for the authentication in the front end.
import React from 'react';
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth, updateProfile,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtN5O62pncciKjpMnr5pp_g1WqbFQilEA",
    authDomain: "comp3900-authentication.firebaseapp.com",
    projectId: "comp3900-authentication",
    storageBucket: "comp3900-authentication.appspot.com",
    messagingSenderId: "270673492757",
    appId: "1:270673492757:web:1e8d8443e47becaff4c71c",
    measurementId: "G-WXWRGWFGQP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

// Error handling.
var EmailError = "";

// Sign up with Google email.
const GoogleProvider = new GoogleAuthProvider();
const signInWithGoogle = async() => {
    try {
        const res = await signInWithPopup(auth, GoogleProvider);
        const usr = res.user;
        const q = query(collection(database, "users"), where("uid", "==", usr.uid));
        const docs = q.getDocs(q);

        if (docs.docs.length === 0) {
            await addDoc(collection(database, "users"), {
                uid: usr.uid,
                name: usr.displayName,
                authProvider: "google",
                email: usr.email,
            }) 
        }
    } catch(err) {
        console.log(err);
    }
}

// Log in with email and password.
const loginWithEmailAndPass = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
        console.log(err);
    }
}

// Sign up with email and password.
const registerWithEmailAndPass = async(displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Updating user name
            await updateProfile(auth.currentUser, { displayName })
            user.reload();
        }) 
}

// Password reset function.
const sendPasswordReset = async(email) => {
    sendPasswordResetEmail(auth, email).then((a) => {
        alert("Password reset email sent!");
        console.log("Test");
    });
}

// Logout.
const logout = () => {
    signOut(auth);
}

export {
    auth,
    database,
    signInWithGoogle,
    loginWithEmailAndPass,
    registerWithEmailAndPass,
    sendPasswordReset,
    logout,
    signInWithEmailAndPassword,
    EmailError
  };