import React, {Component} from 'react';

class TransactionList extends Component{
	state={
		transactions:[],
	}

	componentDidMount(props){
		let uri="http://localhost:9000/transactions?username="+this.props.username;
		fetch(uri).then(res=>res.json()).then(res=>{
			this.setState({transactions:res});
			console.log(this.state.transactions);
		});
		
	}
	render(){
		return(
			<div>
				<h1>List of transactions for user: {this.props.username}</h1>
					{this.state.transactions.map(t=>
						<div>
							<p>Transaction Id: {t.transactionId}</p>
							<p>Closing Balance: {t.balance}</p>
							<p>Added: {t.added}</p>
							<p>Withdrawn: {t.withdrawn}</p>
							<p>Transaction Date and Time: {t.transDT}</p>
							<br></br>
						</div>
					)}
			</div>
		)
	}
}

export default TransactionList;