import React,{Component} from 'react';
import Book from './book.jsx';

class BookList extends Component{
	list(){
		let list;
		list = this.props.books.map((book,index)=>{
			return <Book 
				key = {index}
				index = {index}
				thumbnail= {book.thumbnail}
				title ={book.title}
				owner = {book.owner}
				request = {book.requests}
				id = {this.props.id}
				_id = {book._id}
			/>
		})
		return list;
	}
	render(){
		return(
			<div className='flexBox'>
			{this.props.books? this.list():null}
			</div>
		)
	}
}


export default BookList;