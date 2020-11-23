import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';
import Customer from './Customer';

class Home extends Component{
	render(){
  return (
  	<div>
  		<h1>Welcome to Simple Bank App</h1>
  		<nav>
  			<ul>
  			<li><Link to="/register">Register</Link></li>
  			<li><Link to="/login">Login</Link></li>
  			</ul>
  		</nav>
  		<Route path="/register" exact component={Register} />
  		<Route path="/login" exact component={Login} />
  		<Route path="/banker" exact component={UserList} />
  		<Route path="/customer" exact component={Customer} />
  	</div>
  	)
}}

export default Home;