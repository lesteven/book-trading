//action
export function getBooks(books){
	return{
		type: 'GET_BOOKS',
		books
	}
}

export function fetchBooks(url){
	return(dispatch)=>{
		fetch(url,{credentials:'same-origin'})
			.then(response=>response.json())
			.then(data=>{
				dispatch(getBooks(data))
			})
	}
}

//reducer
export const books =(state=[],action)=>{
	switch(action.type){
		case 'GET_BOOKS':
			return action.books
		default:
			return state;
	}
}

export default books