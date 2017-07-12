import React,{Component} from 'react';
import { connect } from 'react-redux';
import Book from './book.jsx';


class TotalList extends Component{
	list(){
		let list;
		list = this.props.books.books.map((book,index)=>{
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
				{this.props.books.books? this.list():null}
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		user:state.user,
		books:state.books
	}
}
export default connect(mapStateToProps)(TotalList);