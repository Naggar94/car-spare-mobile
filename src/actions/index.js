const filterActions = {
	SetModel: (model,modelName) => {
		return({
			type:"SetModel",
			payload:{
				model:model,
				modelName:modelName
			},
		})
	},
	SetSubModel: (subModel) => {
		return({
			type:"SetSubModel",
			payload:{
				subModel:subModel
			},
		})
	},
	SetDate: (date) => {
		return({
			type:"SetDate",
			payload:{
				date:date
			},
		})
	},
	SetType: (type) => {
		return({
			type:"SetType",
			payload:{
				type:type
			},
		})
	},
	ResetFilter: () => {
		return({
			type:"ResetFilter",
		})
	}
}

const cartActions = {
	AddToCart: (part,oldList) => {
		return({
			type:"AddToCart",
			payload:{
				part:part,
				oldList:oldList
			},
		})
	},
	ChangePartCount: (part,oldList) => {
		return({
			type:"ChangePartCount",
			payload:{
				part:part,
				oldList:oldList
			},
		})
	},
	IncrementPartCount: (part,oldList) => {
		return({
			type:"IncrementPartCount",
			payload:{
				part:part,
				oldList:oldList
			},
		})
	},
	DecrementPartCount: (part,oldList) => {
		return({
			type:"DecrementPartCount",
			payload:{
				part:part,
				oldList:oldList
			},
		})
	},
	RemovePartCount: (part,oldList) => {
		return({
			type:"RemovePartCount",
			payload:{
				part:part,
				oldList:oldList
			},
		})
	},
	ResetCart: () => {
		return({
			type:"ResetCart",
		})
	},
	FillCart: (cart) => {
		return({
			type:"FillCart",
			payload:{
				cart:cart,
			},
		})
	}
}

const addressActions = {
	SetAddress: (addressId,addressName,addressNote) => {
		return({
			type:"SetAddress",
			payload:{
				addressId:addressId,
				addressName:addressName,
				addressNote:addressNote
			},
		})
	},
	SetNote: (addressNote) => {
		return({
			type:"SetNote",
			payload:{
				addressNote:addressNote
			},
		})
	},
	ResetAddress: () => {
		return({
			type:"ResetAddress",
		})
	}
}

const actions = {
	...filterActions,
	...cartActions,
	...addressActions,
}

export default actions;