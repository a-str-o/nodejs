

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.addTransaction = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let transaction = request.body.transaction;
    let responsable = transaction.contributeurId
    let transactionId = transaction.transactionId
    let commune = transaction.commune
    admin.firestore().collection('transactions').add(transaction).then(res => {
        admin.firestore().collection('agences').where("responsable", "==", responsable).limit(1).get()
    .then(docs=>{
       docs.forEach( item => {
           agenceData = item.data()
        if(agenceData.countTransactions){
            agenceData.countTransactions = agenceData.countTransactions+1
        }
        else{
            agenceData.countTransactions = 1
        }
        if(agenceData[commune]){
            agenceData[commune] = agenceData[commune]+1
          }
          else{
            agenceData[commune] = 1
          }
       
        if(agenceData.communes_transactions){
            if(agenceData.communes_transactions[commune]){
                agenceData.communes_transactions[commune].push(transactionId)
            }
            else{
              agenceData.communes_transactions[commune] = [transactionId]
            }  
        }
        else{
            let obj = {}
            obj[commune] = [transactionId]
            agenceData.communes_transactions = obj
          }
        admin.firestore().collection('agences').doc(item.id).update({...agenceData})
        .then(() =>{
            response.status(200).json({"success" : true, "message" : "estimation enregistrée avec succcès"})
        })
        .catch((error) =>{
            response.status(503).json(err)
        });        
    })
})
.catch((error) =>{
    response.status(503).json(error)
});
    })
    .catch((error) =>{
        response.status(503).json(error)
    });
}



