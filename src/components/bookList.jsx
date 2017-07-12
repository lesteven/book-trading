import React,{Component} from 'react';
import { connect } from 'react-redux';
import Book from './book.jsx';

class BookList extends Component{
	list(){
		let list;
		list = this.props.books.map((book,index)=>{
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
			{this.props.books? this.list():null}
			</div>
		)
	}
}


export default BookList;