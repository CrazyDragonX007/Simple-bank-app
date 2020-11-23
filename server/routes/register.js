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
	//console.log(req.body);
	// knex.from('users').select("*").then((rows)=>{});
	const user={user_type: parseInt(req.body.typeOf),
	 firstName: req.body.first_name, 
	 lastName:req.body.last_name,
	 userName:req.body.username,
	 pass:req.body.password
	}
	const usr=req.body.username;
	const init={balance: 0, username: usr};
	if(parseInt(req.body.typeOf)===1){
		knex('users').insert(user).asCallback(function(err) {
    if (err) {
       res.send(err);
    } else {
		knex('accounts').insert(init).then(res.send("success"));
    }
})
	}else{
		knex('users').insert(user).asCallback(function(err) {
			if(err){res.send(err);}else{res.send("success");}
		});
	}
});

module.exports = router;