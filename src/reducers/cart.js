const initialState = {
	list:[],
}

const CartReducer = (state = initialState, action) => {
	switch(action.type){
		case 'AddToCart':
			{
				let newList = [];
				newList = newList.concat(action.payload.oldList);
				if (newList.filter(e => e.id === action.payload.part.id).length <= 0) {
					newList.push(action.payload.part);
				}else{
					let index = newList.findIndex( e => e.id === action.payload.part.id );
					if(index > -1){
						newList[index].count = newList[index].count + 1;
						newList[index] = Object.assign({}, newList[index]);
					}
				}
				
				return {
					...state,
					list:newList,
				};
			}
		case 'IncrementPartCount':
			{
				let newList = [];
				newList = newList.concat(action.payload.oldList);
				let index = newList.findIndex( e => e.id === action.payload.part.id );
				if(index > -1){
					newList[index].count = newList[index].count + 1;
				}

				return {
					...state,
					list:newList,
				};
			}
		case 'DecrementPartCount':
			{
				let newList = [];
				newList = newList.concat(action.payload.oldList);
				let index = newList.findIndex( e => e.id === action.payload.part.id );
				if(index > -1){
					newList[index].count = newList[index].count - 1;
				}

				return {
					...state,
					list:newList,
				};
			}
		case 'RemovePartCount':
			{
				let newList = [];
				newList = newList.concat(action.payload.oldList);
				let index = newList.findIndex( e => e.id === action.payload.part.id );
				if(index > -1){
					let FinalList = [];
					for(var i=0;i<newList.length;i++){
						if(i != index){
							FinalList.push(newList[i]);
						}
					}

					newList = FinalList;
				}

				return {
					...state,
					list:newList,
				};
			}
		case 'ResetCart':{
			return initialState;
		}
		default:
			return {
				...state,
			};
	}
}

export default CartReducer;