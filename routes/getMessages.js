const express = require('express');
const router = express.Router();
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.get('/getMessages',(req,res) => {

       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

               if(err){
               	 console.log("Error",err);
               }else{

               	let collection = client.db('Tiffino_db').collection('Messages');

               	collection.find({}).toArray((err,result) => {
                        
                        if(err){
                        	console.log("Error",err);
                        }else{

                        	let output = result.map(r => ({'firstname':r.firstname,'lastname':r.lastname
                        		             ,'message':r.message,'time':r.time,'image':r.image}));

                        	res.send(output);
                            client.close();  

                        }

               	  });
              }

       });
});

module.exports = router;