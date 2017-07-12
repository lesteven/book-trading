//action
export function getBooks(books){
	return{
		type: 'GET_BOOKS',
		books
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