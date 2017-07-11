import React,{Component} from 'react';

class Book extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='boxChild2'>
				<img src={this.props.thumbnail} />
				<p>{this.props.title}</p>
			</div>
		)
	}
}

export default Book;