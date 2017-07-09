import React,{Component} from 'react';


class MyBooks extends Component{
	render(){
		return(
			<div>
				<h2>My Books</h2>
				<form>
					<input type='text' placeholder='Add Book'/>
					<input type='submit' value='Add'/>
				</form>
			</div>
		)
	}
}

export default MyBooks;