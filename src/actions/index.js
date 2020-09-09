const filterActions = {
	SetModel: (model) => {
		return({
			type:"SetModel",
			payload:{
				model:model
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
	}
}

const actions = {
	...filterActions,
	...cartActions,
}

export default actions;