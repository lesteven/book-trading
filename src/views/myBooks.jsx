import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchInfo,postInfo} from '../redux/modules/infoModule';

class MyBooks extends Component{
	render(){
		return(
			<div>
				<h2>My Books</h2>
				<form autoComplete='off'>
					<input type='text' placeholder='Add Book'/>
					<input type='submit' value='Add'/>
				</form>
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
		postInfo:(data)=>dispatch(postInfo(data))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(MyBooks);