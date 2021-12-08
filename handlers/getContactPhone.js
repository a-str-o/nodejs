
const admin = require('firebase-admin');


exports.getContactPhone = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const email = request.body.email;
    console.log(email)
    admin.firestore().collection('users').where('email', '==', email).get()
    .then((doc) => {
        console.log(doc.size)
        if(doc.size>0){
        doc.forEach(docu => {
            response.status(200).json(docu.data())
        })
    }
    else {
        response.status(404).json({'success' : false, "message" : "Company not found"})
    }
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


