import firebase from "firebase"

const firebaseConfig = {

   
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const func = firebase.functions()

  export {db, func}

  export default firebaseApp
