import FilterReduer from './filter'
import CartReduer from './cart'
import AddressReduer from './address'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
	filter: FilterReduer,
	cart: CartReduer,
	address: AddressReduer,
})

export default allReducers;