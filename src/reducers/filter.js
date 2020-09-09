const initialState = {
	model:"",
	submodel:"",
	date:"",
	type:"",
}

const FilterReducer = (state = initialState, action) => {
	switch(action.type){
		case 'SetModel':
			return {
				...state,
				model:action.payload.model,
			};
		case 'SetSubModel':
			return {
				...state,
				submodel:action.payload.subModel,
			};
		case 'SetDate':
			return {
				...state,
				date:action.payload.date,
			};
		case 'SetType':
			return {
				...state,
				type:action.payload.type,
			};
		default:
			return initialState;
	}
}

export default FilterReducer;