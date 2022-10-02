export default {
	name: 'chapter',
	title: 'Chapter',
	type: 'document',
	fields: [
		{
			name: 'index',
			title: 'Chapter Number',
			type: 'number'
		},{
			name: 'name',
			title: 'Chapter Name',
			type: 'string'
		},{
			name: 'novel',
			title: 'Form (Novel:)',
			type: 'reference',
			to: {type: 'novel'}
		}, {
			name: 'sentences',
			title: 'Sentences',
			type: 'array',
			of: [ { type: 'sentence' } ]
		}
	]
}