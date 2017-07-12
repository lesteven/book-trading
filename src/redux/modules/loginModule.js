//action
export function userLogin(user){
	return{
		type: 'USER_LOGIN',
		user
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