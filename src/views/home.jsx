import React,{Component} from 'react';
import { connect } from 'react-redux';
import {fetchBooks} from '../redux/modules/bookModule';
import TotalList from '../components/totalList.jsx';


class Home extends Component{
	componentDidMount(){
		this.props.fetchBooks('/allbooks')
	}
	render(){
		return(
			<div>
				<h2>Book Trading</h2>
				<TotalList />
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
		fetchBooks:(url)=>dispatch(fetchBooks(url))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);