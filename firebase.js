//import  firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
 import  "firebase/auth";
import { getAuth } from "firebase/auth";
 import  "firebase/database";
 import { getFirestore } from "firebase/firestore";
 import {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID} from "@env"

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  };

  //let app ;
 // if(firebase.apps.length === 0){ 
     app = initializeApp(firebaseConfig);
  //}
  /*else { // if we already have a initiate firebase app juste use just use the firebase app that already initiate
    app = firebase.app();
  }*/
  
  const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  

  export {db , auth}

 // export default app 