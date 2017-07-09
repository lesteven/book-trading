//action
export function userLogin(user){
	return{
		type: 'USER_LOGIN',
		user
	}
}


export function fetchUser(){
	return (dispatch) =>{
		fetch('/users', { credentials : 'same-origin' })
			.then((response)=> response.json())
			.then(data => {
				dispatch(userLogin(data.username))
			})
	}
}

//reducer
export const user = (state ='', action)=>{
	switch(action.type){
		case 'USER_LOGIN':
			return (action.user || null)
		default:
			return state;
	}
}

export default user