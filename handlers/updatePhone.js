

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.updatePhone = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let estimationID = request.body.estimationID;
    let telephone = request.body.telephone;
    console.log(telephone)
    console.log(estimationID)
    let docID = null
    admin.firestore().collection('estimations')
    .where("estimationId", "==", estimationID).get().then(docs => {
        docs.forEach(doc => {
            console.log("doc found",doc.id)
            docID = doc.id
        })
    admin.firestore().collection('estimations').doc(docID).update({
        telephone: telephone, 
       })
        .then(()=> {
            admin.firestore().collection('demandeRappel').add({estimationId : estimationID, telephone : telephone, date : Date.now(), status : "En Attente"})
            .then((docRef) => {
                response.status(200).json({"success" : true})
                })
                .catch(err => {
                console.log(err)
                response.statis(503).json(err)
            })        })
        .catch(err =>{
            console.log(err)
            response.statis(503).json(err)
        })
    })  
    .catch((error) =>{
        response.status(503).json(error)
    });
}


