
const admin = require('firebase-admin');


exports.mesAnnonces = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const uid = request.user.uid;
    console.log(uid)
    let mesAnnonces =[]
    admin.firestore().collection("listing")
    .where("userId", "==", uid).get()
    .then((docs) => {
        docs.forEach(doc=>{
            if(!doc.data().deleted){
            mesAnnonces.push({...doc.data(), id : doc.id})
            }
        })
        response.status(200).json(mesAnnonces)

    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })



}


