
const admin = require('firebase-admin');


exports.getContactPhoneMail = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const id = request.user.uid;
    console.log(id)
    contacts=[]
    admin.firestore().collection('ContactPhoneMail').where('responsable', '==', id).get()
    .then((doc) => {
        doc.forEach(docu => {
            contacts.push(docu.data())
        })
        response.status(200).json(contacts)
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


