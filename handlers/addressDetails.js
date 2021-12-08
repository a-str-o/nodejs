
const admin = require('firebase-admin');


exports.addressDetails = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const url = request.body.url;
    admin.firestore().collection('adresses').where("urlshort","==",url).limit(1).get().then((docs) => {
        docs.forEach(doc => {
        response.status(200).json(doc.data())
        })
    })
    .catch(err => {
        console.log(err)
    })
}


