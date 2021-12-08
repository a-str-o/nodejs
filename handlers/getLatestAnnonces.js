
const admin = require('firebase-admin');


exports.getLatestAnnonces = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let getAnnonce =[]
    let transaction_type = request.body.transaction_type
    console.log(transaction_type)
    admin.firestore().collection("listing")
    .orderBy("date", "desc").where("transaction_type","==", transaction_type).where("valid","==",true).limit(100).get()
    .then((docs) => {
        docs.forEach(doc =>{
            if(!doc.data().deleted){
            getAnnonce.push(doc.data())
            }
            
        })
        response.status(200).json(getAnnonce)
        
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })



}


