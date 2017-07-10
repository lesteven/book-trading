import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchInfo} from '../redux/modules/infoModule';
import { Route, Redirect } from 'react-router'
var qs = require('querystring');

class Profile extends Component{
	constructor(props){
		super(props);
		this.state={
			first: '',
			middle: '',
			last: '',
			city:'',
			state:''
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	componentDidMount(){
		this.props.user?
		this.props.fetchInfo():
		this.props.history.push('/reglog');
	}
	postInfo(data){
		//e.preventDefault();
		let formData;
		
		switch(data){
			case 'name':
				formData={
						first: this.state.first,
						middle: this.state.middle,
						last: this.state.last
					}
				break;
			case 'location':
				formData={
						city: this.state.city,
						state: this.state.state
				}
				break;
		}
		console.log(data,formData)
		
		fetch('/info',{
			method:'POST',
			credentials:'same-origin',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(formData)
		})
		.then(response => response.json())
	}
	render(){
		return(
			<div>
				<h2>Profile</h2>
				<div className='info'>
					<p>Name:</p>
					<p>City:</p>
					<p>State:</p>
				</div>
				<div className='flexBox'>
					<form className='boxChild' onSubmit={(e)=>
							{this.postInfo('name');e.preventDefault()}}>
						<input type='text' placeholder='First Name' name='first'
						value={this.state.first} onChange={this.handleChange}/>
						<br/>
						<input type='text' placeholder='Middle Name' name='middle'
						value={this.state.middle} onChange={this.handleChange}/>
						<br/>
						<input type='text' placeholder='Last Name' name='last'
						value={this.state.last} onChange={this.handleChange}/>
						<br/>
						<input type='submit' value='Update name' />
					</form>
					<form className='boxChild' onSubmit={(e)=>
							{this.postInfo('location');e.preventDefault()}}>
						<input type='text' placeholder='City' name='city'
						value={this.state.city} onChange={this.handleChange}/>
						<br/>
						<input type='text' placeholder='State' name='state'
						value={this.state.state} onChange={this.handleChange}/>
						<br/>
						<input type='submit' value='Update location'/>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		user:state.user,
		info:state.info
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		fetchInfo:()=>dispatch(fetchInfo())
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);