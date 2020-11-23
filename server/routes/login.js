var express = require('express');
var router = express.Router();

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
  		if(rows[0].user_type==0){
  			res.send("0");
  		}else{
  			res.send("1");
  		}
  		
  	}else{
  		res.send("Incorrect Pass");
  	}}
});
});

module.exports = router;