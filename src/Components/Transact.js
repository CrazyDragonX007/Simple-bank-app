import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class Transact extends Component{
	state={
		balance:'',
		amount:0,
		error:''
	}
	componentDidMount(props){
		let uri="http://localhost:9000/viewbal?username="+this.props.username;
		fetch(uri).then(res=>res.text())
      .then(res=>{
      	console.log(res);
      	this.setState({balance:res});
	});
  }
	handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  add=()=>{
  	this.transact('add');
  }
  deduct=()=>{
  	this.transact('withdraw');
  }
  transact=x=>{
  	let er=0;
  	let bal=parseInt(this.state.balance);
  	let amt=this.state.amount;
  	if(x==='add')
  		bal+=amt;
  	else{
  		bal-=amt;
  		if(bal<0){
  			alert("Cannot withdraw. Balance too low");
  			this.setState({error:'low'});
  			er=1;
  		}else{
  			this.setState({error:''});
  			er=0;
  		}
  	}if(er===0){
  		let uri="http://localhost:9000/transact?username="+this.props.username+'&amount='+amt+'&type='+x;
  		fetch(uri).then(res=>res.text()).then(res=>{
  			this.setState({balance:res,amount:amt});
  		});
  	}
  }
	render(){
		return(
			<div>
				<h3>balance is: {this.state.balance}</h3>
				<input type="number" name="amount" placeholder="Enter amount" onChange={this.handleChange}/>
				<Button onClick={this.add} name="add">Add Amount</Button>
				<Button onClick={this.deduct} name="deduct">Withdraw Amount</Button>
			</div>
		)
	}
}
export default Transact;