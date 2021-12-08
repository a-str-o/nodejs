

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.updateEstimation = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let data = request.body.data;
    let res = request.body.res;
    admin.firestore().collection('estimations').where("estimationId", "==", data.estimationId)
    .get()
    .then((docs) =>{

        docs.forEach((doc) => {
            doc.ref.update({
                estimation: res.data.estimation, 
                precision: res.data.indice_de_confiance, 
                variateur: res.data.incertitude_prix
            })

        });

        
    })
    
    .catch((error) =>{
        this.props.dispatch({type: 'UPDATE_ESTIMATION_ERROR'});
    });
}


