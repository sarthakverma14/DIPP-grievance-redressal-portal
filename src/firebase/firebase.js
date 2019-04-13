import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyBvrF7snk0p40y3O82w67jcul6Ajm9GGFY",
    authDomain: "dipp-4cd9b.firebaseapp.com",
    databaseURL: "https://dipp-4cd9b.firebaseio.com",
    projectId: "dipp-4cd9b",
    storageBucket: "dipp-4cd9b.appspot.com",
    messagingSenderId: "432437124157"
})

export default firebase