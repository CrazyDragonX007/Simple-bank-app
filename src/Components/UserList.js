import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import TransactionList from './TransactionList';

class UserList extends Component{
	state={
		users:[],
		balances:[],
		toShow:false,
		user:'',
		isBanker:false
	}

	componentDidMount(){
		const reqOp = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')}
    	};
		let uri="http://localhost:9000/users";
		fetch(uri,reqOp).then(res=>res.json()).then(res=>{
			console.log(res);
			this.balance(res).then(U=>{this.setState({users:res, balances:U, isBanker:this.props.isBanker});console.log(U);});
		});
	}
	balance=async(usrs)=>{
		console.log(localStorage.getItem('token'));
		let bals=[];
		const reqOp = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')}
    	};
		await Promise.all(usrs.map(async u=>await(
			await fetch("http://localhost:9000/viewbal?username="+u.userName,reqOp).then(res=>res.text()).then(res=>{
			bals.push(res);
			console.log(bals);
		})
	)))
		//console.log(usr);
		return bals;
	}

	show=usr=>{
		this.setState({toShow:true,user:usr});
	}

	render(){
		let trs='';
		let tmp='';
		if(this.state.toShow){
			trs=<TransactionList username={this.state.user}/>;
		}if(this.state.isBanker){
			tmp=(this.state.users.map((u,i)=>
					<div>
						<p>First name: {u.firstName}</p>
						<p>Last name: {u.lastName}</p>
						<p>Username: {u.userName}</p>
						<p>user Id: {u.userID}</p>
						<p>Balance: {this.state.balances[i]}</p>
						<Button onClick={()=>this.show(u.userName)}>Show Transactions</Button>
					</div>
				))
		}else{
			tmp=<p>Please login first</p>
		}
		return(
			<div>
				<h1>Banker View</h1>
				<h3>List of Customers</h3>
				{tmp}{trs}
			</div>
	)}	
}

export default UserList;