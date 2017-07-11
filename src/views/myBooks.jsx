import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchInfo,postInfo} from '../redux/modules/infoModule';
import BookList from '../components/bookList.jsx'


class MyBooks extends Component{
	constructor(props){
		super(props);
		this.state={
			query:''
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		this.setState({[event.target.name]:event.target.value})
	}
	componentDidMount(){
		this.props.user?
		this.props.fetchInfo('/info'):
		this.props.history.push('/reglog');
	}
	searchData(){
		let searchData={
			query: this.state.query
		}
		return searchData
	}
	render(){
		return(
			<div>
				<h2>My Books</h2>
				<form autoComplete='off' onSubmit={(e)=>
					{e.preventDefault();
						this.props.postInfo('/info/myBooks',this.searchData());
						this.setState({query:''})
					}}>
					<input type='text' name='query'
					onChange ={this.handleChange}
					placeholder='Add Book'/>
					<input type='submit' value='Add'/>
				</form>
				<BookList/>
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
		fetchInfo:(url)=>dispatch(fetchInfo(url)),
		postInfo:(url,data)=>dispatch(postInfo(url,data))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(MyBooks);