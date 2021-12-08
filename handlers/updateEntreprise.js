

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.updateEntreprise = (request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    const id = request.user.uid;
    const data = request.body.data;

    console.log(data)
    admin.firestore().collection('agences')
    .doc(id)
    .get()
    .then((doc) =>{
                doc.ref.update({
                    responsable : data.responsable,
                    date : data.date,
                    emailEntreprise : data.emailEntreprise,
                    phoneEntreprise: data.phoneEntreprise,
                    countryEntreprise : data.countryEntreprise, 
                    cityEntreprise : data.cityEntreprise,
                    postalcodeEntreprise : data.postalcodeEntreprise, 
                    addressEntreprise : data.addressEntreprise, 
                    nameEntreprise : data.nameEntreprise, 
                    descriptionActivite : data.descriptionActivite,
                    horaires : data.horaires,
                })
                .then(res=>{
                    response.status(200).json({ success: true})        
                })
                .catch(err=>{
                    admin.firestore().collection('agences').doc(id).set({
                                responsable : data.responsable,
                                date : data.date,
                                emailEntreprise : data.emailEntreprise,
                                phoneEntreprise: data.phoneEntreprise,
                                countryEntreprise : data.countryEntreprise, 
                                cityEntreprise : data.cityEntreprise,
                                postalcodeEntreprise : data.postalcodeEntreprise, 
                                addressEntreprise : data.addressEntreprise, 
                                nameEntreprise : data.nameEntreprise, 
                                descriptionActivite : data.descriptionActivite,
                                horaires : data.horaires,
                            })
                            .then(() =>{
                                response.status(200).json({ success: true})        
                            })
                            
                            .catch((error) =>{
                                console.log(error)
                                response.status(503).json(error)
                            });      

                })


        })
        .catch(err=>{
            console.log(err)
            response.status(503).json({ success: false})        

        })    
    }
//     else {
        
//     admin.firestore().collection('agences').doc(id).set({
//         responsable : data.responsable,
//         date : data.date,
//         emailEntreprise : data.emailEntreprise,
//         phoneEntreprise: data.phoneEntreprise,
//         countryEntreprise : data.countryEntreprise, 
//         cityEntreprise : data.cityEntreprise,
//         postalcodeEntreprise : data.postalcodeEntreprise, 
//         addressEntreprise : data.addressEntreprise, 
//         nameEntreprise : data.nameEntreprise, 
//         descriptionActivite : data.descriptionActivite,
//         horaires : data.horaires,
//     })
//     .then(() =>{
//         response.status(200).json({ success: true})        
//     })
    
//     .catch((error) =>{
//         response.status(503).json(error)
//     });
// }
//     })
//     .catch((error) =>{
//         response.status(503).json(error)
//     });
    
// }


