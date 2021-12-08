
const admin = require('firebase-admin');


exports.getAllAgences = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    let agences = []

    admin.firestore().collection('agences').orderBy("countTransactions","desc")
    .get()
    .then((docs) => {
        docs.forEach(docu => {
            let agence  = {}
            if(docu.data().display){

            agence.name = docu.data().nameEntreprise
            agence.image = docu.data().user_image
            agence.description = docu.data().descriptionActivite
            agence.url = docu.data().responsable
            agence.nombreTransac = docu.data().countTransactions
            agences.push(agence)
            }
        })
        response.status(200).json(agences)
    
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


