
const { db, admin } = require('./admin');
const functions = require("firebase-functions");


module.exports = (request, response, next) => {
    let idToken;
    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer ")){
        idToken = request.headers.authorization.split("Bearer ")[1].split(", ")[0]
        console.log(idToken)
        console.log("token found")
    }
    else {
        console.error('No token found')
        return response.status(403).json({error : "Unauthorized"});
    }
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
        return next();
       }
       else {
           response.status(403).json(({"error" : "Unauthorized"}))
       }
    }) 
    .catch( err => {
        console.error('Error while verifying token', err);
        return response.status(403).json(err)
    })  
}
