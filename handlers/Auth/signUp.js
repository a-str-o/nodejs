
const { db, admin } = require('../../util/admin');
const config = require('../../util/config')
const firebase = require('firebase');


exports.signUp = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    const creds = request.body.creds;
    let ret = {}
    firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
    .then (userRes => {
        let userId = userRes.user.uid;
        userRes.user.getIdToken()
     .then((token) => {
        ret.token = token

     })
     .catch(err=>{
         console.log(err)
         response.status(503).json(err)
     })
     firebase.firestore().collection('users').doc(userId).set({
        firstName: creds.firstname,
        lastName: creds.lastname,
        email:creds.email, 
        isPro: false,
        phone: creds.phone
    })
    .then((result) => {
        firebase.firestore().collection('users').doc(userId).get()
        .then(user=> {
            console.log(user)
            ret.data = user.data()
            console.log(ret)
            response.status(200).json(ret)
        }).catch(err=>{
            console.log(err)

        })
    })
    .catch(err=>{
        console.log(err)
        response.status(503).json(err)
    })
    
}).catch(err=>{
    console.log(err)
    response.status(503).json(err)
})
}


