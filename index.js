const functions = require("firebase-functions");
const express = require('express');
const path = require('path')
const fs = require('fs')
prerender = require("prerender-node")

const cors = require('cors')

const http = require('http')


const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


// instantiate services
const app = require('express')(); 
app.use(cors());

const firebase = require ('firebase');
const FBAuth = require('./util/FBAuth');
const FBAuthPro = require('./util/FBAuthPro');

const { createJWTAccessToken } = require('./handlers/createJWTAccessToken')
const { shareEstimation } = require('./handlers/shareEstimation')

const { accessData } = require('./handlers/accessData')
const { sendResults } = require('./handlers/sendResults')
const { instance } = require('./handlers/instance')
const { transactions } = require('./handlers/transactions')
const { places } = require('./handlers/places')
const { AllPlaces } = require('./handlers/AllPlaces')
const { transactionsPro } = require('./handlers/transactionsPro')
const { estimationsUser } = require('./handlers/estimationsUser')
const { transactionsUser } = require('./handlers/transactionsUser')
const { isPro } = require('./handlers/isPro')
const { createReport } = require('./handlers/createReport')
const { getAgence } = require('./handlers/getAgence')
const { getAllAgences } = require('./handlers/getAllAgences')

const { getCompanyInfo } = require('./handlers/getCompanyInfo')
const { addContact } = require('./handlers/addContact')
const { addContactMessage } = require('./handlers/addContactMessage')
const { addTransaction } = require('./handlers/addTransaction')

const { getReport } = require('./handlers/getReport')
const { getEstimation } = require('./handlers/getEstimation')
const { allLeads } = require('./handlers/allLeads')
const { leadsNotification } = require('./handlers/leadsNotification')
const { getArticle } = require('./handlers/getArticle')
const { addError } = require('./handlers/addError')
const { myLeads } = require('./handlers/myLeads')
const { deleteLeads } = require('./handlers/deleteLeads')
const { meetLead } = require('./handlers/meetLead')
const { signIn } = require('./handlers/Auth/signIn')
const { signUp } = require('./handlers/Auth/signUp')
const { updatePassword } = require('./handlers/Auth/updatePassword')

const { passForgot } = require('./handlers/Auth/passForgot')

const { addEstimation } = require('./handlers/addEstimation')
const { updateEstimation } = require('./handlers/updateEstimation')
const { updateEstimationUser } = require('./handlers/updateEstimationUser')

const { setNewEstimation } = require('./handlers/setNewEstimation')
const { deleteEstimation } = require('./handlers/deleteEstimation')
const { getUser } = require('./handlers/getUser')
const { updateEntreprise } = require('./handlers/updateEntreprise')
const { updateUser } = require('./handlers/updateUser')

const { updatePhone } = require('./handlers/updatePhone')
const { countEstimations } = require('./handlers/countEstimations')
const { countTransactions } = require('./handlers/countTransactions')
const { addContactPhoneMail } = require('./handlers/addContactPhoneMail')

const { getContactMessages } = require('./handlers/getContactMessages')
const { getContactPhone } = require('./handlers/getContactPhone')
const { getContactPhoneMail } = require('./handlers/getContactPhoneMail')


const { deleteContactMessage } = require('./handlers/deleteContactMessage')
const { agenceAskedPhone } = require('./handlers/agenceAskedPhone')
const { agenceAskedMail } = require('./handlers/agenceAskedMail')

const { vitrineViews } = require('./handlers/vitrineViews')
const { getTransaction } = require('./handlers/getTransaction')

const { addressDetails } = require('./handlers/addressDetails')

const { demandePro } = require('./handlers/demandePro')

// const { getReport } = require('./handlers/getReport')
app.post('/createJWTAccessToken', FBAuth, createJWTAccessToken)
app.post('/shareEstimation', FBAuth, shareEstimation)

// estimation.post('/accessData', cors(corsOptions),accessData)
app.post('/accessData',accessData)
app.post('/addContactPhoneMail',addContactPhoneMail)

app.post('/sendResults',sendResults)
app.post('/addContact',addContact)
app.post('/addContactMessage',addContactMessage)

app.get('/instance',instance)
app.get('/transactions',transactions)
app.post('/places',places)
app.get('/AllPlaces',AllPlaces)
app.post('/isPro',isPro)

app.get('/transactionsPro',FBAuthPro,transactionsPro)
app.get('/estimationsUser',FBAuth,estimationsUser)
app.get('/transactionsUser',FBAuth,transactionsUser)
app.get('/getUser',FBAuth,getUser)

app.post('/createReport',FBAuthPro,createReport)
app.post('/getReport',getReport)
app.post('/getEstimation',getEstimation)
app.post('/getAgence',getAgence)
app.get('/getAllAgences',getAllAgences)

app.post('/getCompanyInfo',getCompanyInfo)

app.get('/allLeads',FBAuthPro,allLeads)
app.post('/myLeads',FBAuthPro,myLeads)
app.post('/deleteLeads',FBAuthPro,deleteLeads)
app.post('/meetLead',FBAuthPro,meetLead)

app.post('/leadsNotification',FBAuthPro,leadsNotification)
app.post('/getArticle',getArticle)
app.post('/addError',addError)
app.post('/updateEstimation',updateEstimation)
app.post('/updateUser',FBAuth,updateUser)
app.post('/updateEntreprise',FBAuth,updateEntreprise)
// app.post('/updateEntreprise',updateEntreprise)
app.post('/demandePro',demandePro)

app.post('/setNewEstimation',setNewEstimation)

app.post('/updatePhone',updatePhone)
app.post('/addEstimation',addEstimation)
app.post('/addTransaction',addTransaction)

app.post('/updateEstimationUser',updateEstimationUser)

app.post('/deleteEstimation',deleteEstimation)
app.post('/countEstimations',countEstimations)
app.post('/countTransactions',countTransactions)

app.post('/vitrineViews',vitrineViews)
app.post('/getTransaction',getTransaction)

app.post('/addressDetails',addressDetails)

//Auth

app.post('/signIn',signIn)
app.post('/signUp',signUp)
app.post('/passForgot',passForgot)
app.post('/updatePassword',FBAuth, updatePassword)


//Stats Contact
app.get('/getContactMessages',FBAuthPro,getContactMessages)
app.get('/getContactPhone',FBAuthPro,getContactPhone)
app.get('/getContactPhoneMail',FBAuthPro,getContactPhoneMail)

app.post('/deleteContactMessage',FBAuthPro,deleteContactMessage)
app.post('/agenceAskedPhone',FBAuthPro,agenceAskedPhone)
app.post('/agenceAskedMail',FBAuthPro,agenceAskedMail)


const { agents } = require('./handlers/agents.js')
app.get('/agents',agents)

const { addListing } = require('./handlers/addListing.js')
app.post('/addListing',addListing)

const { searchListing } = require('./handlers/searchListing.js')
app.post('/searchListing',searchListing)

const { getAnnonce } = require('./handlers/getAnnonce.js')
app.post('/getAnnonce',getAnnonce)

const { deleteAnnonce } = require('./handlers/deleteAnnonce.js')
app.post('/deleteAnnonce',deleteAnnonce)

const { updateListingPrice } = require('./handlers/updateListingPrice.js')
app.post('/updateListingPrice',updateListingPrice)

const { agenceAskedPhoneAnnonce } = require('./handlers/agenceAskedPhoneAnnonce.js')
app.post('/agenceAskedPhoneAnnonce',agenceAskedPhoneAnnonce)

const { getLatestAnnonces } = require('./handlers/getLatestAnnonces.js')
app.post('/getLatestAnnonces',getLatestAnnonces)

const { addAnnonceAvis } = require('./handlers/addAnnonceAvis.js')
app.post('/addAnnonceAvis',addAnnonceAvis)


const { updateLeadTraitement } = require('./handlers/updateLeadTraitement.js')
app.post('/updateLeadTraitement',updateLeadTraitement)

const { mesAnnonces } = require('./handlers/mesAnnonces.js')
app.get('/mesAnnonces',FBAuthPro,mesAnnonces)


const { addContactMessageAnnonce } = require('./handlers/addContactMessageAnnonce.js')
app.post('/addContactMessageAnnonce',addContactMessageAnnonce)


const { ListingAgence } = require('./handlers/ListingAgence.js')
app.post('/ListingAgence',ListingAgence)


const { signalAnnonce } = require('./handlers/signalAnnonce.js')
app.post('/signalAnnonce',signalAnnonce)
const { isAuth } = require('./handlers/isAuth.js')
app.post('/isAuth',isAuth)


// app.post('/getReport',FBAuthPro,getReport)



// Start the server
const PORT = process.env.PORT || 5000;


exports.api = functions.https.onRequest(app);
const corsHandler = cors({origin: true});


