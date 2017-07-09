import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchInfo} from '../redux/modules/infoModule';

class Profile extends Component{
	componentDidMount(){
		this.props.fetchInfo()
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
					<form className='boxChild'>
						<input type='text' placeholder='First Name'/><br/>
						<input type='text' placeholder='Middle Name'/><br/>
						<input type='text' placeholder='Last Name'/><br/>
						<input type='submit' value='Update name'/>
					</form>
					<form className='boxChild'>
						<input type='text' placeholder='City'/><br/>
						<input type='text' placeholder='State'/><br/>
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