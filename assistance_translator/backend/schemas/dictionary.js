// import chapter from './chapter.js'
export default {
    name: 'dictionary',
    title: "Dictionary",
    type: 'document',
    fields: [
        { name: 'creator', title: 'Created By', type: 'reference', to: { type: 'user' } },
        { name: 'editor', title: 'Edited By', type: 'array', of: [{ type: 'reference', to: { type: 'user' } }] },
        {
            name: 'tokens',
            type: 'array',
            of: [{
                type: 'object',
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
            }]
        }
    ]
}