

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.updateUser = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const id = request.user.uid;
    const data = request.body.data;
    console.log(data)
    admin.firestore().collection('users')
    .doc(id).update({
        lastName : data.lastName,
        firstName : data.firstName,
        phone : data.phone,
        email : data.email,
        city :data.city,
        address : data.address,
        categorie : data.categorie,
        activite : data.activite,
    })
    .then(() =>{
        response.status(200).json({ success: true})        
    })
    
    .catch((error) =>{
        response.status(503).json(error)
    });
}


