
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.transactions = (request,response) => {
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
    .then (docs => {
        docs.forEach(doc => {
            let trans = {}
                    // console.log(ag.data().nameEntreprise)
                    trans.address = doc.data().address
                    trans.bien = doc.data().bien
                    trans.anneeconstruction = doc.data().anneeconstruction
                    trans.consistance = doc.data().consistance
                    trans.anneeconstruction = doc.data().anneeconstruction
                    trans.contributeur = doc.data().contributeur
                    trans.contributeurId = doc.data().contributeurId
                    trans.coordinates = doc.data().coordinates
                    trans.localisation = doc.data().localisation
                    trans.etage = doc.data().etage
                    trans.images = doc.data().images
                    trans.dateTransactions = doc.data().dateTransactions
                    trans.transactionId = doc.data().transactionId
                    trans.prix = "Demandez le prix"
                    transactions.push(trans);
                })
                console.log("réponse")
                response.status(200).json(transactions)
          })

    .catch (err => {
        response.status(503).json(err)
    })
}


