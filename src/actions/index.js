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
	AddToCart: (part) => {
		return({
			type:"AddToCart",
			payload:{
				part:part
			},
		})
	},
	IncrementPartCount: (part) => {
		return({
			type:"IncrementPartCount",
			payload:{
				part:part
			},
		})
	},
	DecrementPartCount: (part) => {
		return({
			type:"DecrementPartCount",
			payload:{
				part:part
			},
		})
	},
	RemovePartCount: (part) => {
		return({
			type:"RemovePartCount",
			payload:{
				part:part
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