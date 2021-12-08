
const admin = require('firebase-admin');


exports.AllPlaces = (request,response) => {
    let ids =[]
    admin.firestore().collection('places').get().then((docs) => {
        docs.forEach(doc => {
            console.log(doc)
        ids.push(doc.id)
        })
        response.status(200).json(ids)
    })
    .catch(err => {
        console.log(err)
    })
}


