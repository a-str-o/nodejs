

const functions = require("firebase-functions");
const admin = require('firebase-admin');

exports.agenceAskedPhoneAnnonce = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let annonce_id = request.body.annonce_id;
    let agence_id = request.body.agence_id;
    admin.firestore().collection('agences').doc(agence_id)
    .get()
    .then((doc) =>{

            if(doc.data().countAskPhoneAnnonce){
              let previous = doc.data().AskPhoneAnnonce  
              previous.push({date : new Date().toISOString(), annonce_id : annonce_id})
            doc.ref.update({
                countAskPhoneAnnonce: doc.data().countAskPhoneAnnonce+1,
                AskPhoneAnnonce : previous
            })
            .then(() => {
                response.status(200).json({"success" : true})
            })
        }

        else{
            
            doc.ref.update({
                countAskPhoneAnnonce: 1,
                AskPhoneAnnonce : [{date : new Date().toISOString(), annonce_id : annonce_id}]

            })
            .then(()=>{
                response.status(200).json({"success" : true})
            })
        }

    })

    
    .catch((error) =>{
        console.log(error)
        response.status(503).json({error})
    });
}


