// <s /> - if a sentence start with that, create new paragraph 
export default {
	name: 'sentence',
	type: 'object',
	fields: [
		{
			name: 'eng',
			type: 'array',
			of: [{
				type: 'object',
				fields:[
					{name: 'word', type: 'string'},
					{name: 'code', type: 'number'}
				]
			}]
		},{
			name: 'mm',
			type: 'string'
		}
	]

}