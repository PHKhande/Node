const Sib = require('sib-api-v3-sdk');

require('dotenv').config(); 

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key'];

apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    email: 'phk151raj@gmail.com'
}

const receivers = [
    {
        email: 'behungry151@gmail.com'
    }
]

tranEmailApi.sendTransacEmail( {
    sender,
    to: receivers,
    subject: 'This is your new password',
    textContent: `Hi change your password`
}).then(console.log)
.catch(console.log);