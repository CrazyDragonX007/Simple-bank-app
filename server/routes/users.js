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

router.get("/",function(req, res, next) {
	knex.from('users').where('user_type','1').then(rows=>{
		console.log(rows);
		res.send(rows);
	});

});

module.exports = router;
