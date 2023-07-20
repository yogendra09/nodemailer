const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = `348131055928-j16hmb4nq1b7roki6jes2h27ek8ieg63.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04K5oaUzfRxYuCgYIARAAGAQSNwF-L9Irky9fS12NhT0MYb8371p-XE2QKmyGvO2nPgPmreUlm2p9OqSLPPLiFbKBjczMsNe-HBo`;

const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 
  REDIRECT_URI);
  authClient.setCredentials({refresh_token: REFRESH_TOKEN});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/send-mail',function(req,res,next){

 
    async function mailer(){
     try{
     const ACCESS_TOKEN = await authClient.getAccessToken();
     const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
     type: "OAuth2",
     user: "hi.yogesh09@gmail.com",
     clientId: CLIENT_ID,
     clientSecret: CLIENT_SECRET,
     refreshToken: REFRESH_TOKEN,
     accessToken: ACCESS_TOKEN
     }
     })
     const details = {
     from: "hi.yogesh09@gmail.com",
     to: req.body.to,
     subject: req.body.subject,
     text: req.body.message,
     html: `<h2 style="color:red">lund se</h2>`
     }
     const result = await transporter.sendMail(details);
     return result;
     }
     catch(err){
     return err;
     }
    }
    mailer().then(res => {
     console.log("sent mail !", res);
    })

})

module.exports = router;
