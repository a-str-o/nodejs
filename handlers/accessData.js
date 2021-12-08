// Function to decode the token passed and return the object of the estimation according to the specific
// type of "bien" to be displayed in the client
const functions = require("firebase-functions");


const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


// function that decodes the token passed
async function decodeJWTToken(accessToken){
    let token = jwt.verify(accessToken, functions.config().jwt.pk)
    // could perform a uid verification of the user_id of the person having added the
    // estimation with email || uid
    return token;
}

// retrieves the estimation
async function getEstimation(estimationID){
    return admin.firestore().collection('estimations').doc(estimationID).get();
}

// retrieves the user
async function getUser(uid) {
    return admin.firestore().collection('users').doc(uid).get();
}


exports.accessData = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    const data = request.body
    const accessToken = data.accessToken;
    console.log("access", accessToken);
    if (!accessToken) {
        response.status(400).json({ result: 'missing information', success: false });
    }

    // check token validity
    let decodedToken=jwt.verify(accessToken, functions.config().jwt.pk)
    console.log("decoded",decodedToken);
    if (decodedToken === undefined) {
        response.status(400).json({ result: 'invalid token', success: false });
    }

    // check that the estimation in the token has the same token
    // as provided
    let estimationDoc;
    let userDoc;
    admin.firestore().collection('estimations').doc(decodedToken.estimationID).get().then((doc) => {
    console.log("doc dat", doc.data())
    estimationDoc = doc.data()})
    .then( (doc) => {
    admin.firestore().collection('users').doc(decodedToken.uid).get().then((res) => {
        userDoc = res.data();
        console.log("res",res.data())
        })
    .then( () => {
        const returnObject = {
            estimation: estimationDoc,
            user: userDoc
        }
        console.log(returnObject);
        return(response.status(200).json({ result: returnObject, success: true }))


    })
        .catch(err => {
            console.log(err)
            return(response.status(503).json(err))
        })
    })     
    .catch(err=> {
        return(response.status(503).json(err))
    })

    // response.status(404).json({ error: "Function not ready yet", success: false })

}


