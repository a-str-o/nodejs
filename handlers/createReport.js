
const admin = require('firebase-admin');


exports.createReport = (request,response) => {

    const rapport_pdf = request.body;

    admin.firestore().collection('rapportPdf').add(rapport_pdf)
    .then((docRef) => {
        console.log("Rapport ajouté à la base. ID : ", docRef.id)
        admin.firestore().collection('estimations')
        .where("estimationId", "==", rapport_pdf.estimationId).get().then(docs => {
            docs.forEach(doc => {
                admin.firestore().collection('estimations').doc(doc.id).update({
           rapport_pdf : docRef.id
                }).then(()=> {
                    console.log("Rapport ajouté à l'estimation. ID : ",rapport_pdf.estimationId)
                    response.status(200).json({"success" : "Rapport sauvegardé", "rapport" : docRef.id})
                })
                .catch(err => {
                    console.log(err)
                })
            })
        })
        .catch(err => {
            console.log("where : ", err)
        })
        })
        .catch(err => {
        console.log(err)
        response.statis(503).json(err)
    })
}


