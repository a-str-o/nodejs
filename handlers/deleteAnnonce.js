

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.deleteAnnonce = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let id = request.body.id;
    let raisons = request.body.raisons
    admin.firestore().collection('listing').doc(id)
    .update({
        deleted: true,
        deleted_reasons : raisons
      })
    .then(() =>{
        response.status(200).json({"success" : true})
        })
        .catch((error) =>{
                console.log(error)
        response.status(503).json(error)

    });
}


