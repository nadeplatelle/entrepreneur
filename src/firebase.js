import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDYFgtqsEN0Ovza-Af6iJqyCePdI5RrrtA",
    authDomain: "entrepreneur-15d6f.firebaseapp.com",
    databaseURL: "https://entrepreneur-15d6f.firebaseio.com",
    projectId: "entrepreneur-15d6f",
    storageBucket: "entrepreneur-15d6f.appspot.com",
    messagingSenderId: "188337228286",
    appId: "1:188337228286:web:4b784fda46a6d19dd318af"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const func = firebase.functions()

  export {db, func}

  export default firebaseApp