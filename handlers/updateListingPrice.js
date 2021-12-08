

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.updateListingPrice = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let id = request.body.id;
    let new_price = request.body.new_price
    admin.firestore().collection('listing').doc(id).get()
    .then(doc => {
        console.log(doc.data())
        let previous_price = doc.data().prix
        if(doc.data().price_updates){
            let price_updates = doc.data().price_updates;
            admin.firestore().collection('listing').doc(id)
            .update({
                price_udpates : [...price_updates,{date : new Date().toISOString(), before : previous_price, after : new_price }],
                lastUpdate : new Date().toISOString(),
                prix : new_price
              })
            .then(() =>{
                response.status(200).json({"success" : true})
            })
            
            .catch((error) =>{
                console.log(error)
                response.status(503).json(error)
            });
        }
        else {
            admin.firestore().collection('listing').doc(id)
            .update({
                price_udpates : [{date : new Date().toISOString(), before : previous_price, after : new_price }],
                prix : new_price
              })
            .then(() =>{
                response.status(200).json({"success" : true})
            })
            
            .catch((error) =>{
                console.log(error)
                response.status(503).json(error)
            });

        }
       
    })
    .catch((error) =>{
        console.log(error)
        response.status(503).json(error)
    });
    
}


