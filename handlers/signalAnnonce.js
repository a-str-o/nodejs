

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.signalAnnonce = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let id = request.body.id;
    let raisons = request.body.raisons
    admin.firestore().collection('listing').doc(id).get()
    .then(doc => {
        if(doc.data().signalements){
            let signalements = doc.data().signalements;
            let count_signalement = doc.data().count_signalement;
            admin.firestore().collection('listing').doc(id)
            .update({
                signalements : [...signalements,{date : new Date().toISOString(), raisons : raisons }],
                count_signalement : count_signalement+1
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
                signalements : [{date : new Date().toISOString(), raisons : raisons }],
                count_signalement : 1
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


