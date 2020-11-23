import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import {validateFields} from '../utils/utilities';
import {Route} from 'react-router-dom';
import Transact from './Transact';
import TransactionList from './TransactionList';
import UserList from './UserList';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isCustomer: false,
    isBanker: false
  };
  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const fieldsToValidate = [{ username }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: 'Please enter all the fields.'
        }
      });
    } else {
    	const data={username,password};
    	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    	fetch("http://localhost:9000/login",requestOptions).then(res=>res.text())
      	.then(res=>{console.log(res);
      	if(res==='0'){
      		this.setState({isBanker:true, errorMsg:''});
      	}else if(res==='1'){
      		this.setState({isCustomer:true, errorMsg:''});
      	}else{
      		this.setState({errorMsg:res});
      	}
      });
      // login successful
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg } = this.state;
    let trans='';
    let transactions='';
    if(this.state.isCustomer){
    	trans= <Transact username={this.state.username}/>;
    	transactions=<TransactionList username={this.state.username}/>
    }else if(this.state.isBanker){

    	trans=<UserList isBanker={true}/>
    }
    return (
      <div>
        <h1>Login</h1>
        <div>
          <Form onSubmit={this.handleLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
        {trans}{transactions}
      </div>
    );
  }
}

export default Login;