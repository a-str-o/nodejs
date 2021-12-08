

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.transactionsUser = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    let transactions = []
        // const db = firebase.firestore();
        // const auth = firebase.auth();
        // db.collection('transactions').where('user_id', '==', auth.currentUser.uid).where('supprimeLe', '==', null).onSnapshot(snapshot => {
        //     const transactions = [];
        //     snapshot.docs.forEach(doc => {
        //         transactions.push(doc.data());
        //     });
    let uid = request.user.uid;
    admin.firestore().collection('transactions').where('contributeurId', '==', uid).get()
    .then ( docs => {
        docs.forEach(doc => {
            transactions.push(doc.data());
          });
        response.status(200).json(transactions)
    })
    .catch (err => {
        response.status(503).json(err)
    })
}


