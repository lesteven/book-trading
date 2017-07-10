import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchInfo,postInfo} from '../redux/modules/infoModule';
import { Route, Redirect } from 'react-router'


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
		this.nameData = this.nameData.bind(this);
		this.locData = this.locData.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	initialState(){
		const initState={
			first: '',
			middle: '',
			last: '',
			city:'',
			state:''
		}
		return initState;
	}
	nameData(){
		let formData={
			first: this.state.first,
			middle: this.state.middle,
			last: this.state.last
		}
		return formData
	}
	locData(){
		let formData={
			city: this.state.city,
			state: this.state.state
		}
		return formData
	}
	info(){	
		return(
			<div className='info'>
				<p>Name: {
					this.props.info.info[0].first + ' ' +
					this.props.info.info[0].middle + ' ' +
					this.props.info.info[0].last}
				</p>
				<p>Location: {
					this.props.info.info[0].city + ' ' +
					this.props.info.info[0].state}
				</p>
			</div>
		)	
	}
	componentDidMount(){
		this.props.user?
		this.props.fetchInfo():
		this.props.history.push('/reglog');
	}
	render(){
		return(
			<div>
				<h2>Profile</h2>
				{this.props.info.info?this.info():null}
				<div className='flexBox'>
					<form className='boxChild' autoComplete='off' 
						onSubmit={(e)=>
							{e.preventDefault();
								this.props.postInfo(this.nameData());
								this.setState(this.initialState())
							}}>
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
					<form className='boxChild' autoComplete='off'
						onSubmit={(e)=>
							{e.preventDefault();
								this.props.postInfo(this.locData());
								this.setState(this.initialState())
							}}>
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
		fetchInfo:()=>dispatch(fetchInfo()),
		postInfo:(data)=>dispatch(postInfo(data))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);