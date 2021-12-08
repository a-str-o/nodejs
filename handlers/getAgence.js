
const admin = require('firebase-admin');


exports.getAgence = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const uid = request.body.user_id;
    console.log(uid)
    admin.firestore().collection('agences')
    .where("responsable", "==", uid).limit(1).get()
    .then((doc) => {
        if(doc.size>0){
        doc.forEach(docu => {
            response.status(200).json(docu.data())

        })
    }
    else{
        response.status(200).json({"success" : false, "message" : "Impossible de récupérer les données de l'agence"})
    }
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


