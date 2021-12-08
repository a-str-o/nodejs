const { db, admin } = require('../util/admin');
const config = require('../util/config')

exports.agents = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Credentials', true);
    let ids =[]
    admin.firestore().collection('agences').get().then((docs) => {
        docs.forEach(doc => {
            ids.push(doc.data())
        })
        response.status(200).json(ids)
    })
    .catch(err => {
        console.log(err)
    })
}