import{getApps , getApp , initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain:process.env.REACT_APP_AUTHDOMAIN ,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGESENDERID ,
//     appId: process.env.REACT_APP_APPID,
//   };
const firebaseConfig = {
  apiKey: "AIzaSyCDxkCyqQ064oOtK-9N13qJt32sNebD4vE",
  authDomain: "code-editor-a4676.firebaseapp.com",
  projectId: "code-editor-a4676",
  storageBucket: "code-editor-a4676.appspot.com",
  messagingSenderId: "125218681801",
  appId: "1:125218681801:web:2db37d8c42a3a71182ae18"
};

  const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const db = getFirestore(app);

  export {app , auth, db};