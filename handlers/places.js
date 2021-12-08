
const admin = require('firebase-admin');


exports.places = (request,response) => {

    const id = request.body.id;
    admin.firestore().collection('places').doc(id).get().then((doc) => {
        console.log(doc.data())
        response.status(200).json(doc.data())
    })
    .catch(err => {
        console.log(err)
    })
}


