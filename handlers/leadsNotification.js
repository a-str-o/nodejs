
const admin = require('firebase-admin');


exports.leadsNotification = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const id = request.body.id;
    admin.firestore().collection('leads')
.where("notify", "array-contains", id).get()
    .then (docs => {
        console.log(docs.size)
        response.status(200).json({"notifications" : docs.size})
    })
        .catch(err => {
            console.log(err)
        })
    
}
    
  
