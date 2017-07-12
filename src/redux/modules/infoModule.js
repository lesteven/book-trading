var qs = require('querystring');

//action
export function getInfo(info){
	return{
		type: 'GET_INFO',
		info
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
//////////////////////////////////////////////////

export function fetchInfo(url,actFunc){
	return(dispatch)=>{
		fetch(url,{credentials:'same-origin'})
			.then(response=> response.json())
			.then(data=>{
				actFunc(data)
			})
	}
}

export function postInfo(url,data,actFunc){
	return(dispatch)=>{
		fetch(url,{
			method:'POST',
			credentials:'same-origin',
			headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
			body:qs.stringify(data)
		})
		.then(response => response.json())
		.then(data=>{
			actFunc(data)
		})
	}
}
