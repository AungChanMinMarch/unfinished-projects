const mongoose = require("mongoose");
const fs = require('fs')
const Chapter = require('../models/chapter.js');
const Sentence = require('../models/sentence.model.js');
const Question = require('../models/question.js');
const Noti = require('../models/noti.js');

exports.addChapter = (req, res)=>{
    // console.time("api")
    console.log("adding new chapter");
    const { novelId } = req.params;
    const { name, index, sentences } = req.body;
    console.log(req.body);
    let promises = [];
    const chapter = new Chapter({
        name: name,
        index: index,
        novel: mongoose.Types.ObjectId(novelId),
    })
    chapter.save((err, chapterDocs) => {
        if (err) {
            res.status(500).json({message: err});
            return;
        }
        for(let i=0; i<sentences.length; i++){
            const newSentence = new Sentence({...sentences[i], chapterId: mongoose.Types.ObjectId(chapterDocs._id)})
            promises.push(newSentence.save())
        }
        Promise.all(promises).then(()=>{
            // console.timeEnd('api')
            res.status(200).json({ message: "novel created successfully"});
        })
    });
}

exports.getChapter = (req, res)=>{
    const {chapterId} = req.params
    Chapter.getChapter(chapterId ,function(err, docs){
        if (err) {
            res.status(500).json({message: err});
            console.log(`findById id:${chapterId} returns err`);
            return;
        }
        if(!docs) {
            res.status(404)
            .json({message : 'The novel does not exist'})
            return;
        }
        res.status(200).json({novel: docs})
        // fs.writeFile('test.json', JSON.stringify(docs), function(){
        //   console.log('written');
        // });
    })
}

exports.deleteChapter = (req, res)=>{
  const {chapter_id} = req.params
  Novel.deleteOne(
    {_id: chapter_id},
    function(err, docs){
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      res.status(200).json({message: "deleted Successullly"})
  })
}

exports.ask = (req, res)=>{
    const { chapterId } = req.params;
    const { question, ids, respondents} = req.body;
    const newQuestion = new Question({
        questioner: mongoose.Types.ObjectId(req.userId),
        respondent: respondents.map(respondent => mongoose.Types.ObjectId(respondent)),
        chapter: mongoose.Types.ObjectId(chapterId),
        sentences: ids.map(id=>mongoose.Types.ObjectId(id)),
        question: question
    })
    newQuestion.save(function(err, questionDocs){
        if(err) return res.status(500).json({message: err})
        const newNoti = new Noti({
            sender: req.userId,
            receiver: questionDocs.respondents,
            reference: questionDocs._id,
            referenceType: "Question",
            message: `asked you a Question : ${questionDocs.question}`
        })
        newNoti.save((err, docs)=>{
          if(err)
            return res.status(500).send({message: err});
          else
            res.status(200).json({
                noti: docs,
                message: 'asked successfully!'
            })
        })
    })
}