
const { db, admin } = require('../util/admin');
const jwt = require('jsonwebtoken');
const functions = require("firebase-functions");

// creates the JWT token necessary to share the estimation
// to the external users and general public

// checks if the user is a pro
async function isPro(uid) {
    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.data().isPro === true) {
        return true;
    } else {
        return false;
    }
}

// checks if the estimation has a JWT token
async function estimationJWTCheck(estimationId) {
    const estimationDoc = await db.collection('estimations').doc(estimationId).get();
    const accessToken = estimationDoc.data().accessToken;
    return accessToken;
}

// updates the estimation with the created token
function updateEstimation(accessToken, estimationID) {
    admin.firestore().collection('estimations').doc(estimationID).update({
        accessToken
    });
}




exports.shareEstimation = (request,response) => {

    let estimationID = null
    const id = request.body.id;
    let uid = request.user.uid;

    admin.firestore().collection('estimations')
    .where("estimationId", "==", id).get().then(docs => {
        docs.forEach(doc => {
            console.log("doc found",doc.id)
            estimationID = doc.id
        })
        let accessTokenReturn = null;
        console.log("hello", estimationID)
        db.collection('estimations').doc(estimationID).get().then((doc) => {
            accessTokenReturn = doc.data().accessToken
            if (!accessTokenReturn) {
                console.log("undefined")
                accessTokenReturn=jwt.sign( // creates token if not existant
                    {
                        estimationID,
                        uid,
                        iat: Math.floor(Date.now() / 1000)
                    },
                    functions.config().jwt.pk
                )
                
                // console.log(res);
                updateEstimation(accessTokenReturn, estimationID);
                console.log('estimation updated');
                return(response.status(200).json({ result: accessTokenReturn, success: true}));

        
            } else {
            // simply sets the token to the variable
        
            admin.firestore().collection('estimations').doc(estimationID).update({
                shareLink : accessTokenReturn
                     })
            return(response.status(200).json({ result: accessTokenReturn, success: true}));
        
            }
    

        })
        .catch(err=> {
            return(response.status(403).json(err))
        })




    })
   


}
