
const { db, admin } = require('../util/admin');

exports.isPro = (request,response) => {
    console.log(request.body)
    const token = request.body.token;
    idToken = token.split("Bearer ")[1].split(", ")[0]
    console.log(idToken)
    console.log("token found")
    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        request.user = decodedToken;
        return db.collection('users')
            .doc(request.user.uid)
            .get()
    })
    .then (data => {
       if(data.data().isPro){
        console.log("is pro")
        response.status(200).json({"succes" : "user pro"})
       }
       else {
           response.status(203).json(({"error" : "Unauthorized"}))
       }
    }) 
    .catch( err => {
        console.error('Error while verifying token', err);
        return response.status(403).json(err)
    })  
}

