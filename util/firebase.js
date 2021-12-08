
const config = require('./config')
const firebase = require('firebase');
firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = { firebase, db };