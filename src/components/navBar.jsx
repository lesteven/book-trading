import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchUser} from '../redux/modules/loginModule'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import RegLog from '../views/regLog.jsx';
import Home from '../views/home.jsx';
import Profile from '../views/profile.jsx';
import MyBooks from '../views/myBooks.jsx';

class NavBar extends Component{

	componentDidMount(){
		this.props.getUser()
		
	}
	removeStorage(){
		localStorage.clear()
	}
	login(){
		return(
			<span>
				<Link to = '/mybooks'>My Books</Link>
				<Link to ='/profile'>{this.props.user}</Link>
				<a href ='/users/logout' onClick={this.removeStorage}>Log Out</a>
			</span>
		)
	}
	noLogin(){
		return(
			<Link to ='/reglog'>Register/Login</Link>
		)
	}
	render(){
		return(
			<Router>
			<div>
				<nav className = 'navBar'>
					<Link to ='/'>Home</Link>
					{this.props.user?
						this.login():this.noLogin()}
				</nav>

				<Route exact path= '/' component ={Home}/>
				<Route path ='/reglog' component ={RegLog}/>
				<Route path = '/profile' component ={Profile}/>
				<Route path = '/mybooks' component={MyBooks}/>
			</div>
			</Router>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		user:state.user
	};
};

const mapDispatchToProps = (dispatch) =>{
	return{
		getUser: () => dispatch(fetchUser())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);