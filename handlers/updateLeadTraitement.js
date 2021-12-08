

const functions = require("firebase-functions");
const admin = require('firebase-admin');


exports.updateLeadTraitement = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let userId = request.body.userId;
    let leadId = request.body.leadId;
    let value = request.body.value;

    //read the doc
    admin.firestore().collection('leads').doc(leadId).get()
    .then(doc => {

        let suivi = doc.data().suivi

        //Check if the field "suivi" already exist
        if(suivi){
            //The field suivi in the doc exist  so I am going to update it


            //Now I am checking it this particular user updated the suivi (maybe the suivi exist because another user updated it first)
            if(suivi[userId]){
                let usersuivi = suivi[userId]
                usersuivi.push({value : value, date : new Date().toISOString()})
               suivi[userId] = usersuivi
               console.log(suivi)
            }
            else {
                //If not i create the field inside suivi
                suivi[userId]=[{value : value, date : new Date().toISOString()}]
            }
            let updates = {suivi : suivi}
            let latestUpdates = doc.data().latestUpdates
            latestUpdates.push({event : value, uid : userId, date : new Date().toISOString()})
            updates.latestUpdates=latestUpdates
            // I also want to update the filed that has the name of the value
            //First I check if it exists
            if(doc.data()[value]){
                let valueField = doc.data()[value]
                console.log(valueField)
                valueField.push({uid : userId, date : new Date().toISOString()})
                updates[value]=valueField
            }
            else{
                //It does not exist I create it
                updates[value] =[{uid : userId, date : new Date().toISOString()}]
            }
            console.log(updates)
            admin.firestore().collection('leads').doc(leadId).update(
                updates
            )
            .then(()=>{
                response.status(200).json()

            })
            .catch((error) =>{
                console.log(error)
                response.status(503).json(error)
            });



            
        }
        else{

            //The field suivi does not exist, I create it
            suivi = {}
            latestUpdates=[]
            
            suivi[userId]=[{value : value, date : new Date().toISOString()}]
            let updates = {suivi : suivi}
            updates[value] =[{uid : userId, date : new Date().toISOString()}]
            updates.latestUpdates=[{event : value, uid : userId, date : new Date().toISOString()}]
            admin.firestore().collection('leads').doc(leadId).update(
                updates
            )
            .then(()=>{
                response.status(200).json()

            })
            .catch((error) =>{
                console.log(error)
                response.status(503).json(error)
            });

        }
       
    })
    .catch((error) =>{
        console.log(error)
        response.status(503).json(error)
    });   
}


