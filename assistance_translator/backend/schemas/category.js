export default {
	name: 'category',
	type: 'document',
	fields: [{
		name: 'name',
		type: 'string',
	},{
		name: 'preps',
		type: 'array',
		of: [{
			type: "object",
			fields:[{
				name: 'subCategory',
				type: 'string'
			},{
				name: 'thadar',
				type: 'array',
				of: [{
					type: 'string'
				}]
			}]
		}]
	}]
}