var express = require('express');
var router = express.Router();
var {verify}=require('../middleware');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root1234',
    database : 'Bank'
  }
});

router.get("/",verify,function(req, res, next) {
	//console.log(req.headers);
	const user=req.query.username;
	knex.from('accounts').select('balance').where({username:user}).orderBy('transDT','desc')
	.then(row=>{
		const bal=row[0].balance;
		console.log(bal);
		res.send(bal.toString());
	});
});

module.exports = router;