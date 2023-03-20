const Sib = require('sib-api-v3-sdk');
const ExpUser = require('../../models/ExpenseTracker/user');

exports.getResetEmailInfo = (req, res, next) => {
    
    const resetEmail = req.body;
    console.log(resetEmail);
    // const resetUser = await ExpUser.findAll({where: {email:resetEmail}})

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
        email: resetEmail
        }
    ]

    console.log(sender,resetEmail);

    tranEmailApi.sendTransacEmail( {
        sender,
        to: receivers,
        subject: 'This is your password',
        textContent: `Hi change your password`
    })
    .then(console.log)
    .catch(console.log);
    res.status(201).json({message:'Succesfull'})

}