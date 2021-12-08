
const admin = require('firebase-admin');


exports.myLeads = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const uid = request.body.uid;
    console.log(uid)
    myNotifiedLeads =[]
    admin.firestore().collection("leads")
    .where("notify", "array-contains", uid).get()
    .then((doc) => {
        console.log(doc)
        doc.forEach(docu => {
            myNotifiedLeads.push(docu.data())
        })
        admin.firestore().collection("leads")
        .where("handled", "array-contains", uid).get()
        .then((doc) => {
            console.log(doc)
            doc.forEach(docu => {
                myNotifiedLeads.push(docu.data())
            })
            response.status(200).json(myNotifiedLeads)
            })
    
        })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })



}


