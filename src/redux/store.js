import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import user from './modules/loginModule';
import books from './modules/bookModule';
import info from './modules/infoModule';

const reducers = combineReducers({
	user,
	books,
	info
})

export default function configureStore(initialState){
	return createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension? window.devToolsExtension():f=>f
		)
	)
	
}

