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
	const user=req.query.username;
	knex.from('accounts').where({username:user}).then(rows=>res.send(rows));
});

module.exports = router;