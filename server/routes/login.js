var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root1234',
    database : 'Bank'
  }
});



router.post('/', function(req, res, next) {
  const usr=req.body.username;

  knex.from('users').select('pass','user_type').where({userName:usr})
  .then(rows=>{
    if(!rows || !rows[0]){
      res.send("Invalid username");
    }else{
    if(rows[0].pass==req.body.password){
      let payload = {username: usr};
      if(rows[0].user_type==0){
        payload.usertype='0';
      }else{
        payload.usertype='1';
      }
      //console.log(payload);
      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS384",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
      //console.log(accessToken);
    res.json(accessToken);
    res.send();
      
    }else{
      res.send("Incorrect Pass");
    }}
});
});

module.exports = router;