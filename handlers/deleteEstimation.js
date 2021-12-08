

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.deleteEstimation = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let estimationID = request.body.estimationId;
    admin.firestore().collection('estimations').where("estimationId", "==", estimationID)
    .get()
    .then((docs) =>{
        docs.forEach((doc) => {
            const today = new Date().toISOString();
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();

            let date = day + '/' + month + '/' + year;
            doc.ref.update({
                isDeleted : true,
                supprimeLe: date
            })
            .then(() => {
                response.status(200).json({"success" : true})

            })


        });

        
    })
    
    .catch((error) =>{
        response.status(503).json(error)

    });
}


