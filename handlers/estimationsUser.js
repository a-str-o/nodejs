

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.estimationsUser = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    let estimations = []
            // const db = firebase.firestore();
        // const auth = firebase.auth();
        // db.collection('estimations').where('user_id', '==', auth.currentUser.uid).where('supprimeLe', '==', null).onSnapshot(snapshot => {
        //     const estimations = [];
        //     snapshot.docs.forEach(doc => {
        //         estimations.push(doc.data());
        //     });
    let uid = request.user.uid;
    admin.firestore().collection('estimations').where('user_id', '==', uid).where('supprimeLe', '==', null).get()
    .then ( docs => {
        docs.forEach(doc => {
            estimations.push(doc.data());
          });
        response.status(200).json(estimations)
    })
    .catch (err => {
        response.status(503).json(err)
    })
}


