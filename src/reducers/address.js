const initialState = {
	addressId:"",
	addressNote:"",
	addressName:""
}

const AddressReducer = (state = initialState, action) => {
	switch(action.type){
		case 'SetAddress':
			return {
				...state,
				addressId:action.payload.addressId,
				addressName:action.payload.addressName,
			};
		case 'ResetAddress':
			return initialState;
		default:
			return {
				...state
			};
	}
}

export default AddressReducer;