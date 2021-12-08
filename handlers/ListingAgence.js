
const admin = require('firebase-admin');


exports.ListingAgence = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Credentials', true);

    const uid = request.user.uid;
    let ListingAgence =[]
    admin.firestore().collection("listing").where("userId", "==", uid).get()
    .then((docs) => {
        docs.forEach(doc=>{
            ListingAgence.push({...doc.data(), id : doc.id})
        })
        response.status(200).json(ListingAgence)

    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })



}


