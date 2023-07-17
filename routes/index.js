const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = `get it from developer console`;
const CLIENT_SECRET = `get it from developer console`;
const REFRESH_TOKEN = `get it from developer console`;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/send-mail',function(req,res,next){

  const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 
    REDIRECT_URI);
    authClient.setCredentials({refresh_token: REFRESH_TOKEN});
    async function mailer(){
     try{
     const ACCESS_TOKEN = await authClient.getAccessToken();
     const transport = nodemailer.createTransport({
     service: "gmail",
     auth: {
     type: "OAuth2",
     user: "admin ka email",
     clientId: CLIENT_ID,
     clientSecret: CLIENT_SECRET,
     refreshToken: REFRESH_TOKEN,
     accessToken: ACCESS_TOKEN
     }
     })
     const details = {
     from: "yogendrayadav168@gmail.com",
     to: req.body.to,
     subject: req.body.subject,
     text: req.body.message,
     html: "<h2>lund se</h2>"
     }
     const result = await transport.mailer(details);
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
