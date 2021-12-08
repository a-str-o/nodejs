
const admin = require('firebase-admin');


exports.addError = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const error = request.body;

    admin.firestore().collection('errors').add({
            estimationState : error.estimationState,
            date : error.date, 
            user : error.user,
            type : error.type, 
            other : error.other
    })
    .then((docRef) => {
        console.log("Rapport ajouté à la base. ID : ", docRef.id)
        response.status(200).json({"error_id" : docRef.id})
        })
        .catch(err => {
        console.log(err)
        response.statis(503).json(err)
    })
}


