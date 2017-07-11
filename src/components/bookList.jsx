import React,{Component} from 'react';
import { connect } from 'react-redux';
import Book from './book.jsx';

class BookList extends Component{
	componentWillReceiveProps(props){
		console.log('received',props)
	}
	list(){
		let list;
		list = this.props.info.books.map((book,index)=>{
			return <Book 
				key = {index}
				thumbnail= {book.thumbnail}
				title ={book.title}
			/>
		})
		return list;
	}
	render(){
		return(
			<div className='flexBox'>
			{this.props.info.books? this.list():null}
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

export default connect(mapStateToProps)(BookList);