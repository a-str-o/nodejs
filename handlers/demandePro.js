
const admin = require('firebase-admin');

exports.demandePro = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    console.log(request.body)
    console.log("started")
    admin.firestore().collection('agenzpro').add(
        {
         email : request.body.email, 
         agencyName : request.body.agencyName,
         firstName : request.body.firstName,
         lastName : request.body.lastName,
         phone : request.body.phone,
         city : request.body.city,
        date : new Date().toISOString() }
    ).then(res => {
        console.log("success")
        response.status(200).json({"success" : true}) 
    })
    .catch(err => {
        response.status(503).json(err)
    })
}


