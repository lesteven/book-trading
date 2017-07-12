import React,{Component} from 'react';
import { connect } from 'react-redux';
import {getBooks} from '../redux/modules/bookModule';
import {fetchInfo} from '../redux/modules/infoModule';
import BookList from '../components/bookList.jsx';


class Home extends Component{
	componentDidMount(){
		this.props.fetchInfo('/allbooks',this.props.getBooks)
	}
	render(){
		return(
			<div>
				<h2>Book Trading</h2>
				<BookList books={this.props.books.books}/>
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
const mapDispatchToProps=(dispatch)=>{
	return{
		fetchInfo:(url,actFunc)=>dispatch(fetchInfo(url,actFunc)),
		getBooks:(books)=>dispatch(getBooks(books))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);