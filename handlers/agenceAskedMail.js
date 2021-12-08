

const functions = require("firebase-functions");
const admin = require('firebase-admin');

exports.agenceAskedMail = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let message_id = request.body.message_id;
    let agence_id = request.body.agence_id;
    admin.firestore().collection('agences').where("responsable", "==", agence_id)
    .get()
    .then((docs) =>{

        docs.forEach((doc) => {
            if(doc.data().countAskMail){
              let previous = doc.data().AskMail  
              previous.push({date : new Date().toISOString(), messageId : message_id})
            doc.ref.update({
                countAskMail: doc.data().countAskMail+1,
                AskMail : previous
            })
            .then(() => {
                response.status(200).json({"success" : true})
            })
        }

        else{
            
            doc.ref.update({
                countAskMail: 1,
                AskMail : [{date : new Date().toISOString(), messageId : message_id}]

            })
            .then(()=>{
                response.status(200).json({"success" : true})
            })
        }

        })
    })

    
    .catch((error) =>{
        console.log(error)
        response.status(503).json({error})
    });
}


