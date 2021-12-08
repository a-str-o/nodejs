
const { db, firebase } = require('../../util/firebase');



exports.updatePassword = (request,response) => {
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
    console.log(request.user)
    let uid = request.user.uid;
    firebase.auth().signInWithEmailAndPassword(creds.email, creds.curentPassword)
    .then((user) =>{
        console.log(user)
        firebase.auth().currentUser.updatePassword(creds.newPassword)
      .then(() => {
        response.status(200).json({"success": true, "message" : "Mot de passe mis à jour"})
      })
      .catch(err=>{
          response.status(503).json(err)
      })
    })

    .catch(err=>{
        response.status(503).json(err)
    })
}


