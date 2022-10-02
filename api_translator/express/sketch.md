# What data will need to be stored?

user (name, email, password, profile picture)
novel (name, translated name, author, translator, creator, ...)
chapter (name, index, novel)
sentence (eng, mm, index, chapter, memory, google translate, ...)
question (description, asker, respondents, comments)
invite
noti

# What data is likely to be accessed together?
## Auth View
 - user
## Home View (novels view)
    novel - create index {creator: 1}
## Chapters View 
    chapter - create index {novel: 1, index: 1}
## Sentences View (Chapter View)
    sentence - create index { chapter: 1, index: 1}
## Questions View
    
## Question View
    question (asker, got askeds, comments, [{ sentence_id, description, answers:[{answerer, explanation, answer, comments}]}])

# What queries will be run most frequently?
## often
db.novels.find({ "creator" : "id"})
db.chapters.find({ "novel" : "id"})
db.sentences.find({ "chapter" : "id"})
db.questions.findById(id)//getting


## rarely
db.users.find({email: ...}) //may be alse password
db.users.insert({...})

# What data is likely to grow at a rapid unbounded pace?