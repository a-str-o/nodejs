const { db, admin } = require('../util/admin');
const config = require('../util/config')
const filterData = (list,typologie,surfacemin, surfacemax,prixmin,quartier) => {
    return new Promise((resolve, reject) => {
        if(typologie.length>0){
            if(typologie.includes(5)){
                list = list.filter(x=> {return (typologie.includes(x.typologie)||x.typologie5plus==true)})
            }
            else{
                list = list.filter(x=> {return (typologie.includes(x.typologie))})
            }            
        }
        if(surfacemin){
            list = list.filter(x=> x.surfaceHabitableSearch > surfacemin)
        }
        if(surfacemax){
            list = list.filter(x=> x.surfaceHabitableSearch < surfacemax)
        }
        if(prixmin){
            list = list.filter(x=> x.prix > prixmin)
        }
        if(quartier.length>0){
            console.log(quartier)
            list = list.filter(x=> quartier.includes(x.quartier))
    
        }
        resolve(list)
        
    
    })
}

exports.searchListing = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Credentials', true);
    let commune = request.body.commune
    let prixmax = request.body.prixmax
    let prixmin = request.body.prixmin
    let type = request.body.type
    let lastVisible = request.body.lastVisible
    let transaction_type = request.body.transaction_type
    let surfacemin = request.body.surfacemin
    let surfacemax = request.body.surfacemax
    let typologie = request.body.typologie
    let quartier = request.body.quartier
    console.log(surfacemin)
    console.log(surfacemax)
    console.log(typologie)

    console.log(transaction_type)
    const listingRef = admin.firestore().collection('listing').orderBy('prix','asc').where("valid","==",true).where("transaction_type","==", transaction_type)

    let query = listingRef
    let maxRes = 100

    if(commune){
        console.log(commune)
        query = query.where("commune", "==", commune)
    }
    else{
        console.log("No commune, no quartier")
    }
    if(prixmax){
        console.log(prixmax)
        query = query.where("prix", "<=", prixmax)
    }
    if(type.length>0){
        console.log(type)
        query = query.where("type", "in", type)
    }
    if(lastVisible){
        query = query.startAfter(lastVisible)
    }

        let data = {lastVisible : null, result : []}
        query.
        limit(maxRes).get().then((docs) => {
            if(docs.size==maxRes){
                data.lastVisible = docs.docs[docs.docs.length-1].data().prix
            }
            docs.forEach(doc => {
                if(!doc.data().deleted){
                data.result.push(doc.data())
                }
            })
            filterData(data.result,typologie, surfacemin, surfacemax,prixmin,quartier).then(res=>{
                data.result = res
                response.status(200).json(data)
            })
            .catch(err=>{
                console.log(err)
            })

        })
        .catch(err => {
            console.log(err)
            response.status(503).json({"error" : "Internal Server Error"})
    
        })
    }
