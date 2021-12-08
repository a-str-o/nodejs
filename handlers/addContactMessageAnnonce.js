
const admin = require('firebase-admin');

const updateContactAgence = (data) => {
    let {annonceId, agenceId, messageId} = data
    console.log(data)
    console.log(agenceId)
    return new Promise ((resolve,reject) => {
        admin.firestore().collection('agences').doc(agenceId)
        .get()
        .then((doc) =>{
        if(doc.data().countMessageAnnonce){
            let previous = doc.data().messagesAnnonces
            previous.push({date : new Date().toISOString(), annonceId : annonceId, messageId : messageId})
            doc.ref.update({
                countMessageAnnonce: doc.data().countMessageAnnonce+1,
                messagesAnnonces : previous
            })
            .then(() => {
resolve()
            })
            .catch(err=>{
reject(err)
            })
        }
        else{
            doc.ref.update({
                countMessageAnnonce: 1,
                messagesAnnonces : [{date : new Date().toISOString(), annonceId : annonceId, messageId : messageId}]
            })
            .then(() => {
                resolve()
            })
            .catch(err=>{
                reject(err)

            })
        }

    })
    .catch(err=>{
        console.log(err)
        reject(err)
    })
    })
    
}

exports.addContactMessageAnnonce = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const data = request.body.data; 
    let annonceId = request.body.annonceId;
    let agenceId = request.body.agenceId;
    admin.firestore().collection('contact').add(data)
    .then((doc) => {
        let message_id = doc.id
        admin.firestore().collection('listing').doc(annonceId)
        .get()
        .then((doc) =>{

        if(doc.data().countMessage){

            let previous = doc.data().messages
            previous.push({date : new Date().toISOString(), messageId : message_id})
            doc.ref.update({
                countMessage: doc.data().countMessage+1,
                messages : previous
            })
            .then(() => {


                updateContactAgence({annonceId :annonceId, agenceId :agenceId, messageId : message_id}).then(()=>{
                    response.status(200).json({"success" : true})
                })
                .catch(err=>{
                    console.log(err)
                    response.status(503).json(err)
                })
                
            })
            .catch(err=>{
                console.log(err)
                response.status(503).json(err)

            })
        }
        else{
            doc.ref.update({
                countMessage: 1,
                messages : [{date : new Date().toISOString(), messageId : message_id}]
            })
            .then(() => {

                updateContactAgence({annonceId :annonceId, agenceId :agenceId, messageId : message_id}).then(()=>{
                    response.status(200).json({"success" : true})
                })
                .catch(err=>{
                    console.log(err)
                    response.status(503).json(err)
                }) 
             })
            .catch(err=>{
                console.log(err)

                response.status(503).json(err)

            })
        }

    })
        .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
})
.catch(err=>{
    console.log(err)
    response.status(503).json(err)

})
}


