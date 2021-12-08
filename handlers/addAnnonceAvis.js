
const admin = require('firebase-admin');


exports.addAnnonceAvis = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    let id = request.body.id;
    let current_price = request.body.current_price;
    console.log(current_price)
    let avis = request.body.avis;
    console.log(avis)
    let estimation = request.body.estimation
    console.log(estimation)

    admin.firestore().collection('listing').doc(id).get()
    .then(doc => {
        if(doc.data().avis){
            let previous_avis = doc.data().avis
            let count_avis = doc.data().count_avis
            admin.firestore().collection('listing').doc(id)
            .update({
                avis : [...previous_avis, {date : new Date().toISOString(), current_price : current_price, avis : avis, estimation : estimation}],
                count_avis : count_avis+1
            })
            .then(() => {
                response.status(200).json({"success" : true})
            })
            .catch(err =>{
                console.log(err)
                response.status(503).json(err)

            })
        }
        else{
            
            admin.firestore().collection('listing').doc(id)
            .update({
                avis : [{date : new Date().toISOString(), current_price : current_price, avis : avis, estimation : estimation}],
                count_avis : 1
            })
            .then(() => {
                response.status(200).json({"success" : true})
            })
            .catch(err =>{
                console.log(err)
                response.status(503).json(err)

            })

        }
})
.catch(err=>{
    console.log(err)
    response.status(503).json(err)

})
}


