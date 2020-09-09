const initialState = {
	list:{},
}

const CartReducer = (state = initialState, action) => {
	switch(action.type){
		case 'AddToCart':
			{
				let newList = state.list;
				newList[action.payload.part.id] = action.payload.part;
				return {
					...state,
					list:newList,
				};
			}
		case 'IncrementPartCount':
			{
				let newList = state.list;
				newList[action.payload.part.id].count = newList[action.payload.part.id].count + 1;
				return {
					...state,
					list:newList,
				};
			}
		case 'DecrementPartCount':
			{
				let newList = state.list;
				newList[action.payload.part.id].count = newList[action.payload.part.id].count - 1;
				return {
					...state,
					list:newList,
				};
			}
		case 'RemovePartCount':
			{
				let newList = state.list;
				delete newList[action.payload.part.id];
				return {
					...state,
					list:newList,
				};
			}
		default:
			return initialState;
	}
}

export default CartReducer;