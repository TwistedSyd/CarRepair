import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init
var firebaseConfig = {
  apiKey: 'AIzaSyCRrT3YtwYvFsTlaVNsClUvWh9_WETBajg',
  authDomain: 'car-repair-shop-8dc13.firebaseapp.com',
  databaseURL: 'https://car-repair-shop-8dc13.firebaseio.com',
  projectId: 'car-repair-shop-8dc13',
  storageBucket: 'car-repair-shop-8dc13.appspot.com',
  messagingSenderId: '66175895235',
  appId: '1:66175895235:web:415fb77cf9a424a8ad4476'
}

firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()

// firebase collections
const appointments = db.collection('appointments')

export {
  firebase,
  db,
  appointments
}
