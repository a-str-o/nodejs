
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.transactionsPro = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    let transactions = []
    const data = request.body
    admin.firestore().collection("transactions")
    .orderBy("dateTransactionAdded", "desc").get()
    .then ( docs => {
        docs.forEach(doc => {
            trans = doc.data()
            trans.prix = "Demandez le prix"
            transactions.push(trans);
          });
        response.status(200).json(transactions)
    })
    .catch (err => {
        response.status(503).json(err)
    })
}


