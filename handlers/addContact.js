
const admin = require('firebase-admin');


exports.addContact = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const data = request.body.data;

    admin.firestore().collection('contact').add(data)
    .then((docRef) => {
        response.status(200).json({"contact added" : true})
        })
        .catch(err => {
        console.log(err)
        response.statis(503).json(err)
    })
}


