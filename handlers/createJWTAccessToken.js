
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




exports.createJWTAccessToken = (request,response) => {
    const data = request.body;
    // let auth = false;
    // let pro = false;
    let uid = request.user.uid;
    let accessTokenReturn = null;
    
    // // check if authenticated
    // if (context.auth && context.auth.uid) {
    //     auth = true;
    //     uid = context.auth.uid;
    // }
    // if (auth === false) {
    //     console.log({ result: 'unauthorized call', success: false});
    //     return { result: 'unauthorized call', success: false};
    // }

    // // check if user is pro
    // pro = await isPro(uid);
    // if (pro === false) {
    //     console.log({ result: 'unauthorized call', success: false});
    //     return { result: 'unauthorized call', success: false};
    // }

    // create the JWT token
    const estimationID = data.estimationId;
    console.log(uid)
    // estimationJWTCheck(estimationID).then((res) => {
    db.collection('estimations').doc(estimationID).get().then((doc) => {
        console.log(doc.data())
        console.log(doc)
        accessTokenReturn = doc.data().accessToken
    })
    .catch(err=> {
        return(response.status(403).json(err))
    })
    console.log("ress ",accessTokenReturn)
    if (!accessTokenReturn) {
        console.log("udefined")
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

    } else {
    // simply sets the token to the variable
    console.log("else")
    return(response.status(200).json({ result: accessTokenReturn, success: true}));

    }
    console.log(accessTokenReturn)
    // console.log({ result: accessTokenReturn, success: true});
    // response.status(404).json({error : 'Function not ready yet'});
    return(response.status(200).json({ result: accessTokenReturn, success: true}));

}
