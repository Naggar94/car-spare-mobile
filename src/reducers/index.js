import FilterReduer from './filter'
import CartReduer from './cart'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
	filter: FilterReduer,
	cart: CartReduer,
})

export default allReducers;