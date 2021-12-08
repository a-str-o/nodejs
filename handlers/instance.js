// Function to decode the token passed and return the object of the estimation according to the specific
// type of "bien" to be displayed in the client
const functions = require("firebase-functions");

exports.instance = (request,response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Credentials', true);
    console.log("Server instanciated");
    response.status(200).json({ result: 'Server instanciated', success: true });
}


