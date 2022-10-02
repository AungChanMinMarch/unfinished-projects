const mongoose = require("mongoose")
const Novel = require('../models/novel.js')
const Noti = require('../models/noti.js')
const User = require('../models/user.js')
const Invite = require('../models/invite.js')
// const EditorInvite = require('../models/editorInvite.js')
 
exports.addnovel = (req, res)=>{
    const { name, author, mmName, translator} = req.body
    const newNovel = new Novel({
        name: name,
        author: author,
        mmName: mmName,
        translator: translator,
        admin: mongoose.Types.ObjectId(req.userId),
    });

    newNovel.save((err, novelDocs) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        res.status(200).json({novel: novelDocs, message: "novel created"})
    });
}

exports.getnovels = (req, res)=>{
    Novel.getNovels(req.userId, function(err, docs){
        if (err) {
            res.status(500).json({message: err});
            return;
        } else {
            console.log('responding novels');
            res.status(200).json({
                novels: docs,
                message: 'Successfully loaded novels...'
            })
        }
    })
}

exports.getnovel = (req, res)=>{
    const {novelId} = req.params
    Novel.getNovel(req.userId, novelId, function(err, docs){
      if (err) {
        res.status(500).json({message: err});
        return;
      }
      if(docs.length == 0) {
        res.status(403).json({ message : 'The novel does not exist Or you cannot access this novel'})
        return;
      }
      res.status(200).json({
        novel: docs[0],
        message: `Loaded ${docs[0].name} successfully`
      })
    })
}

exports.deleteNovel = (req, res)=>{
  const {novelId} = req.params;
  Novel.deleteMany(
    {_id: novelId, admin: mongoose.Types.ObjectId(req.userId)},
    function(err, docs){
    if (err) {
      res.status(500).json({message: err});
      return;
    }
    if(docs.deletedCount === 1){
            console.log('deleted a novel with id:'+ novelId + ' by a user with id:'+ req.userId);
            res.status(200).json({message: "deleted Successullly"})
    }
    if(docs.deletedCount === 0){
        res.status(403).json({message: "You can't delete this novel."})
    }
  })
}

exports.addEditor = (req, res) =>{
    const {novelId} = req.params;
    const {userId} = req.body;
    Invite.uniqueSave({
        novel: novelId,
        invitee: userId
    },function(err, docs){
        if(err){
            res.status(500).json({message: err});
            return
        }
        const newNoti = new Noti({
            sender: req.userId,
            receiver: [userId],
            reference: docs._id,
            referenceType: "Invite",
            message: 'asked you to become the editor'
        })
        newNoti.save((err, docs)=>{
          if(err)
            return res.status(500).json({message: err});
          else
            res.status(200).json({
                noti: docs,
                message: 'invite successfully!'
            })
        })
    })
}

exports.acceptEditor = async function (req, res){
  console.log('accepting');
  Novel.findByIdAndUpdate(
    req.invite.novel, 
    {$push:{editors: req.invite.invitee}},
    function(err, docs){
      if(err) return res.status(500).send({message: err});
      Invite.findByIdAndUpdate(
        req.invite._id, 
        {state: 'accepted'},
        function(err, docs){
        if(err) return res.status(500).send({message: err});
        const newNoti = new Noti({
          sender: req.invite.invitee,
          receiver: [docs.admin],
          reference: docs._id,
          referenceType: "Novel",
          message: `accepted your invite for novel(name-${docs.name}, mmName-${docs.mmName}) to become the editor`
        });
        newNoti.save(function(err,docs){
          if(err) return res.status(500).send({message: err});
          res.status(200).json({
            message: 'accepted request!!! you are now editor.'
          })
        })
      })
    }
  )
}

exports.rejectEditor = async function (req, res){
    Invite.findByIdAndUpdate(
        req.invite._id, 
        {state: 'rejected'},
        function(err, inviteDocs){
            if(err) return res.status(500).json({message: err});
            const newNoti = new Noti({
                sender: req.invite.invitee,
                receiver: [inviteDocs.admin],
                reference: inviteDocs._id,
                referenceType: "Invite",
                message: `rejected your invitation on ${inviteDocs.createdAt}`
            });
            newNoti.save(function(err,docs){
                if(err) return res.status(500).send({message: err});
                    res.status(200).json({ message: 'rejected request!!!' })
            })
        }
    )
}