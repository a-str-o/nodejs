
const admin = require('firebase-admin');


exports.allLeads = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    leads = []
    admin.firestore().collection('leads')
    .get()
    .then((doc) => {
        console.log(doc)
        doc.forEach(docu => {
            leads.push(docu.data())
        })
        response.status(200).json(leads)
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


