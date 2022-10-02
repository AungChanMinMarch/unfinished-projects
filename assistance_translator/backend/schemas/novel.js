// import chapter from './chapter.js'
export default {
    name: 'novel',
    title: 'Novel',
    type: 'document',
    fields: [
        { name: 'name', title: "Original Name", type: 'string' },
        // { name: 'description', title: "Description", type: 'string' },
        { name: 'mm_name', title: "Translate Name", type: 'string' },
        { name: 'author', title: "Author Name", type: 'string' },
        { name: 'translator', title: "Translator Name", type: 'string' },
        { name: 'creator', title: 'Created By', type: 'reference', to: { type: 'user' } },
        { name: 'editor', title: 'Edited By', type: 'array', of: [{ type: 'reference', to: { type: 'user' } }] },
        // { name: 'genres', title: "Genres", type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
        // { name: 'img', title: 'Cover Photo', type: 'image' },
    ]
}