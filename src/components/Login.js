// src/components/GoogleSignIn.js
import React from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { getAuth, GoogleAuthProvider ,onAuthStateChanged} from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('User Info: ', user);


      localStorage.setItem('userInfoFromFirebase', JSON.stringify(user));
      localStorage.setItem('accessToken', JSON.stringify(token));
      navigate('/today');

    } catch (error) {
      console.error('Error during Google Sign-In: ', error.message);
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default GoogleSignIn;
