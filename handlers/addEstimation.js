

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.addEstimation = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let estimation = request.body.estimation;
    let estimationId = request.body.estimationId;
    console.log(estimationId)
    admin.firestore().collection('estimations').doc(estimationId).set({
        ...estimation, 
        estimationId : estimationId}).then(res => {
        console.log(res)
        response.status(200).json({"success" : true, "message" : "estimation enregistrée avec succcès"})
})
.catch((error) =>{
    console.log(error)
    response.status(503).json(err)
});
}



