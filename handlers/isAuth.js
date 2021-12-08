
const { db, admin } = require('../util/admin');
const jwt = require('jsonwebtoken');
exports.isAuth = (request,response) => {
    console.log(request.body)
    const token = request.body.token;
    idToken = token.split("Bearer ")[1].split(", ")[0]
    console.log(idToken)
    console.log("token found")
    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        return response.status(200).json({decodedToken})
    })
    .catch( err => { 
        console.error('Error while verifying token', err);
        return response.status(403).json(err)
    })  
}

