
const admin = require('firebase-admin');

const getAgenceData = (uid) => {
    return new Promise((resolve, reject) => {
        console.log(uid)
        admin.firestore().collection("agences")
        .where("responsable", "==", uid).limit(1).get()
        .then(docs => {
            console.log(docs)
            if(docs.size < 1){
                reject({"error" : "Pas d'agence"})
            }
            docs.forEach(doc => {
                let return_doc = doc.data()
                delete return_doc.AskMail
                delete return_doc.last_update
                delete return_doc.AskPhone
                delete return_doc.lastupdate
                delete return_doc.countAskPhone
                console.log("3",return_doc)
                resolve({...return_doc, agenceId : doc.id})
            })
        })
        .catch(err => {
            reject(err)
        })

    })
}
exports.getAnnonce = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let slug = request.body.slug
    let data = {}
    admin.firestore().collection("listing")
    .where("slug", "==", slug).limit(1).get()
    .then((docs) => {
        docs.forEach(doc =>{
            console.log("1",doc.id)
            data.annonce = {...doc.data(), annonceId : doc.id}
            console.log(doc.data().userId)
            getAgenceData(doc.data().userId).then( doc => {
                console.log("2",doc)
                data.agence = doc
                response.status(200).json(data)
            })
            .catch(err=>{
                console.log(err)
                response.status(503).json(err)
            })

        })
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })



}


