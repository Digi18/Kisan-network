const express = require('express');
const Nexmo = require('nexmo');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const date = require('date-and-time');

 const nexmo = new Nexmo({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET
});

const dburl = process.env.URL;

 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({extended: true}));

router.post('/sendSms',(req,res) => {

        const now = new Date();
        const time = date.format(now, 'DD MMM. HH:mm'); 
        const from = 'Nexmo';
        const to = '919664277803';
        const text = req.body.message;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const image = 'null';

        
        nexmo.message.sendSms(from,to,text,(err,responseData) => {

                        if(err){
                        	console.log("My Error",err);
                        }else{

                        	res.send("Message sent successfully.");

                       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                              if(err){
                                console.log("Error",err);
                         
                              }else{

                         	let collection = client.db('Tiffino_db').collection('Messages');

                         	collection.insertOne({firstname:firstname,lastname:lastname,message:text,
                         		                  time:time,image:image}).then((resp) => {

                         		console.log("Message added successflly.");

                         	}).catch((err) => {
                              
                                console.log("Error",err);
                         	});
                         }  
                              
                        
                         });

                  }  

          });  

});

module.exports = router;