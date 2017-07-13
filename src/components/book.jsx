import React,{Component} from 'react';
import { connect } from 'react-redux';
import {postInfo,getInfo} from '../redux/modules/infoModule';
import {getBooks} from '../redux/modules/bookModule';


class Book extends Component{
	constructor(props){
		super(props);
	}
	tradeButton(){
		if(this.props.user.username !== this.props.owner){
			return(
				<button onClick={()=>this.props.postInfo('/requests',
				'POST',this.data(),this.props.getBooks)}>
					Trade
				</button>
			)
		}
	}
	data(){
		let data ={
			title:this.props.title,
			index:this.props.index,
			_id:this.props._id
		}
		return data
	}
	deleteButton(){
		if(this.props.id){
			return(
				<button onClick={()=>this.props.postInfo('/info/myBooks',
					'DELETE',this.data(),this.props.getInfo)}>
					Delete
				</button>
			)
		}
	}
	render(){
		return(
			<div className='boxChild2'>
				<img src={this.props.thumbnail} />
				<p>{this.props.title}</p>
				{this.props.user.username && this.props.owner?
					this.tradeButton():null}
				{this.deleteButton()}
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		user:state.user
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		postInfo:(url,method,data,actFunc)=>
				dispatch(postInfo(url,method,data,actFunc)),
		getInfo:(info)=>dispatch(getInfo(info)),
		getBooks:(books)=>dispatch(getBooks(books))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Book);