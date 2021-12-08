
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
const functions = require("firebase-functions");
apiKey.apiKey = functions.config().sendinblue.key;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

exports.sendResults = (request,response) => {

    const data = request.body;
    const email = data.email;
    const name = data.name;
    const surname = data.surname;
    const estimation = data.estimation;
    const estimationHigh = data.estimationHigh;
    const estimationLow = data.estimationLow;
    const address = data.address;

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        to: [{
            email,
            name: surname + ' ' + name
        }],

        subject: address + ' - Résultat de votre estimation',
        templateId: 2,
        params: {
            surname,
            estimation,
            estimationHigh,
            estimationLow,
            address
        }
    };
    apiInstance.sendTransacEmail(sendSmtpEmail).then((res) => {
        response.status(200).json({
            message : `Email sent successfully`
        })
        console.log('API called successfully. Returned data: ' + res);
    })
    .catch((err) => {
        response.status(500).json({error : 'Something went wrong'});
        console.error(err.text)
    });

}
