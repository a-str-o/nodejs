
const { db, firebase } = require('../../util/firebase');



exports.signIn = (request,response) => {
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
    firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .then (userRes => {
     userRes.user.getIdToken()
     .then((token) => {
        ret.token = token
     })
     .catch(err=>{
         console.log(err)
         response.status(503).json(err)
     })
    firebase.firestore().collection('users').doc(userRes.user.uid).get()
        .then(user=> {
            console.log(user)
            ret.data = user.data()
            console.log(ret)
            response.status(200).json(ret)
        }).catch(err=>{
            console.log(err)

        })
    }).catch(err=>{
        response.status(503).json(err)
    })
}


