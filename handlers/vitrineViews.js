'use strict'

const { google } = require('googleapis')

const key = require('../auth.json')
const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
const view_id = '228371581'

process.env.GOOGLE_APPLICATION_CREDENTIALS = './auth.json'

exports.vitrineViews = (request,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    let url = request.body.url;

    jwt.authorize().then(() => {
    google.analytics('v3').data.ga.get(
        {
        auth: jwt,
        ids: 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        metrics: 'ga:pageviews',
        dimensions : 'ga:pagePath',
        filters : "ga:pagePath=="+url

        }
    )
    .then((result) => {
        res.status(200).json({"views" : result.data.rows[0][1]})
    })
    .catch(err => {
        res.status(503).json(err)
    })
})
.catch(err => {
    res.status(403).json(err)
})
}