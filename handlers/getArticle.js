
const admin = require('firebase-admin');


exports.getArticle = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Credentials', true);

    const article_id = request.body.article_id;
    admin.firestore().collection('articles')
    .where("link", "==", article_id).get()
    .then((docs) => {
        docs.forEach(doc => {
            response.status(200).json(doc.data())
        })
    })
    .catch(err => {
        console.log(err)
        response.status(503).json(err)
    })
}


