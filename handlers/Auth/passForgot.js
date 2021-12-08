
const { db, firebase } = require('../../util/firebase');



exports.passForgot = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    const creds = request.body.creds;
    let ret = {}
    firebase
    .auth()
    .sendPasswordResetEmail(creds.email)
    .then((user) => {
        response.status(200).json({"success" : true, "message" : "email envoyé avec succès"})
    }).catch(err=>{
        response.status(503).json(err)
    })
}


