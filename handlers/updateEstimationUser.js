

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.updateEstimationUser = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let estimation = request.body.estimation;
    let estimationId = request.body.estimationId;
    admin.firestore().collection('estimations').where("estimationId", "==", estimationId).limit(1).get()
    .then(docs=>{
        if(docs.size>0){
       docs.forEach( item => {
        admin.firestore().collection('estimations').doc(item.id).update({...estimation, estimationId : estimationId})
        .then(() =>{

            response.status(200).json({"success" : true, "message" : "estimation enregistrée avec succcès"})
        
    })
    .catch((error) =>{
        response.status(503).json(error)
    });
       })
    }
    else{
        admin.firestore().collection('estimations').add({...estimation, estimationId : estimationId})
        .then(() =>{

            response.status(200).json({"success" : true, "message" : "estimation enregistrée avec succcès"})
        
    })
    .catch((error) =>{
        response.status(503).json(error)
    });
    }

    })
    

    
    .catch((error) =>{
        response.status(503).json(error)
    });

}



