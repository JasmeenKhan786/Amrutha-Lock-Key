import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDJWTltrm_V80PpK8urfG957TeJdZb7lBM",
  authDomain: "u18-f69a5.firebaseapp.com",
  projectId: "u18-f69a5",
  storageBucket: "u18-f69a5.appspot.com",
  messagingSenderId: "145787288159",
  appId: "1:145787288159:web:7cde207c6ff7bbe94b39ea"
};
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);

}
export default firebase.firestore()

