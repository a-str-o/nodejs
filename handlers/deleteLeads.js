
const admin = require('firebase-admin');


exports.deleteLeads = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const uid = request.body.uid;
    const estimationId = request.body.estimationId
    console.log(uid)
    admin.firestore().collection("leads")
    .where("estimationId", "==", estimationId).get()
    .then((docs) => {
        console.log(docs)
        docs.forEach(doc => {
            if (doc.data().deletedBy){
            admin.firestore().collection("leads").doc(doc.id).update({
                notify : doc.data().notify.filter(notif => notif!=uid ),
                deletedBy : admin.firestore.FieldValue.arrayUnion({uid : uid, date : new Date().toISOString()}),
                handled : admin.firestore.FieldValue.arrayRemove(uid)

            })
            .then (response.status(200).json())
            .catch(err => {
                response.status(503).json(err)
            })
        }
        else {
            admin.firestore().collection("leads").doc(doc.id).update({
                notify : doc.data().notify.filter(notif => notif!=uid ),
                deletedBy : [{uid : uid, date : new Date().toISOString()}],
                handled : admin.firestore.FieldValue.arrayRemove(uid)

            })
            .then (response.status(200).json())
            .catch(err => {
                response.status(503).json(err)
            })

        }
            })

        })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


