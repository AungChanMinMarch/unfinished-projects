export default {
    name: "word",
    type: "document",
    fields: [
        { name: 'spelling', type: 'string' },
        {
            name: "meanings",
            type: "array",
            of: [{
                type: 'object',
                fields: [{
                    name: 'category',
                    type: 'reference',
                    to: [{ type: 'category' }]
                }, {
                    name: 'meaning',
                    type: 'string'
                }]
            }]

        }
    ]
}