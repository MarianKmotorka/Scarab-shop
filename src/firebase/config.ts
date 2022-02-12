import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

var firebaseConfig = {
  apiKey: 'AIzaSyCZfMPcgX-UG05jk3ibOSDlCaeU23ItnQs',
  authDomain: 'makm-scarabeus-prod.firebaseapp.com',
  projectId: 'makm-scarabeus-prod',
  storageBucket: 'makm-scarabeus-prod.appspot.com',
  messagingSenderId: '827161142551',
  appId: '1:827161142551:web:ea4e8f6f91aeb841cb0352',
  measurementId: 'G-H4M2P4P22N',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const FieldValue = firebase.firestore.FieldValue
const FieldPath = firebase.firestore.FieldPath
const getTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp

export {
  projectStorage,
  projectFirestore,
  projectAuth,
  getTimestamp,
  FieldValue,
  FieldPath,
}
