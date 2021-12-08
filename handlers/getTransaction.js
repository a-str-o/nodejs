
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.getTransaction = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    const transactionId = request.body.transactionId
    let trans = {}
    admin.firestore().collection("transactions").where("transactionId", "==",transactionId).limit(1)
    .get()
    .then((docs) => {
        docs.forEach(doc => {
        trans.address = doc.data().address
        trans.bien = doc.data().bien
        trans.anneeconstruction = doc.data().anneeconstruction
        trans.consistance = doc.data().consistance
        trans.anneeconstruction = doc.data().anneeconstruction
        trans.contributeur = doc.data().contributeur
        trans.contributeurId = doc.data().contributeurId
        trans.etage = doc.data().etage
        trans.images = doc.data().images
        trans.dateTransactions = doc.data().dateTransactions
        trans.transactionId = doc.data().transactionId
        admin.firestore().collection("agences").where("responsable", "==",doc.data().contributeurId).limit(1)
        .get()
        .then (agences => {
            console.log("agence", agences.size)
            agences.forEach(agence => {
                trans.agence = {
                    nameEntreprise : agence.data().nameEntreprise,
                    responsable : agence.data().responsable,
                    user_image : agence.data().user_image,
                    emailEntreprise : agence.data().emailEntreprise,
                    phoneEntreprise : agence.data().phoneEntreprise,
                    descriptionActivite : agence.data().descriptionActivite
                }
                console.log(trans)
                response.status(200).json(trans)
            })
        })
        .catch(err => {
            console.log(err)
            response.status(503).json(err)

        })

    })
          })
    .catch (err => {
        response.status(503).json(err)
    })
}


