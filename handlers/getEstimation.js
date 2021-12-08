
const admin = require('firebase-admin');


exports.getEstimation = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const id = request.body.id;
    admin.firestore().collection('estimations')
    .where("estimationId", "==", id).get().then(docs => {
        docs.forEach(doc => {
            console.log(doc)
            response.status(200).json(doc.data())
        })
    })
        .catch(err => {
            console.log(err)
        })
    
}
    
  
