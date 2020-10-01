const initialState = {
	model:"",
	modelName:"",
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
				modelName:action.payload.modelName,
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
		case 'ResetFilter':
			return initialState;
		default:
			return {
				...state
			};
	}
}

export default FilterReducer;