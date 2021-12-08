

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.setNewEstimation = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let estimationID = request.body.estimationID;
    let res = request.body.res;
    let docID = null
    admin.firestore().collection('estimations')
    .where("estimationId", "==", estimationID).get().then(docs => {
        docs.forEach(doc => {
            console.log("doc found",doc.id)
            docID = doc.id
        })
    admin.firestore().collection('estimations').doc(docID).update({
        estimation: res.data.estimation, 
        precision: res.data.indice_de_confiance, 
        variateur: res.data.incertitude_prix             })
        .then(()=> {
            response.status(200).json({ success: true})
        })
    })  
    .catch((error) =>{
        response.status(503).json(error)
    });
}


