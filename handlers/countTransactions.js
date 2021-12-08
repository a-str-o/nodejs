

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.countTransactions = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
            // const db = firebase.firestore();
        // const auth = firebase.auth();
        // db.collection('estimations').where('user_id', '==', auth.currentUser.uid).where('supprimeLe', '==', null).onSnapshot(snapshot => {
        //     const estimations = [];
        //     snapshot.docs.forEach(doc => {
        //         estimations.push(doc.data());
        //     });
    let uid = request.body.user_id;
    let transactions=[]

    admin.firestore().collection('transactions').where('contributeurId', '==', uid).get()
    .then ( docs => {
        console.log(docs.size)
        docs.forEach((doc)=>{
            trans = doc.data()
            transactions.push({
                surfaceparking : trans.surfaceparking,
                localisation : trans.localisation,
                typologie : trans.typologie,
                dateTransactions : trans.dateTransactions,
                consistance : trans.consistance,
                address : trans.address,
                contributeurId : trans.contributeurId,
                dateTransactionAdded : trans.dateTransactionAdded,
                bien : trans.bien,
                transactionId : trans.transactionId,
                surfaceeffective : trans.surfaceeffective,
                images : trans.images,
                etage : trans.etage
                
            })
        })
        response.status(200).json({"nombre" : docs.size, "vente" : transactions})
    })
    .catch (err => {
        response.status(503).json(err)
    })
}


