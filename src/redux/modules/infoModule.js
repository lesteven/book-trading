var qs = require('querystring');

//action
export function getInfo(info){
	return{
		type: 'GET_INFO',
		info
	}
}

export function fetchInfo(){
	return(dispatch)=>{
		fetch('/info',{credentials:'same-origin'})
			.then(response=> response.json())
			.then(data=>{
				dispatch(getInfo(data))
			})
	}
}

export function postInfo(data){
	return(dispatch)=>{
		fetch('/info',{
			method:'POST',
			credentials:'same-origin',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(data)
		})
		.then(response => response.json())
		.then(data=>{
			dispatch(getInfo(data))
		})
	}
}
//reducer
export const info =(state={},action)=>{
	switch(action.type){
		case 'GET_INFO':
			return action.info
		default:
			return state;
	}
}

export default info