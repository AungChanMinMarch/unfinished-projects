const NovelMessage = require("./../models/novelMessage.js")

module.exports.getNovels = async (req, res)=>{
	        try{
	        	const novelMessage = new NovelMessage;
	        	console.log(novelMessage)
	            const novelMessage1 = await NovelMessage.find()
	            console.log(novelMessage1)
	            res.status(200).json(novelMessage1)
	        }catch(err){

	            console.log(err)
	            res.status(404).json(err.message)
	        }
}

module.exports.createNovel = async (req, res)=>{
	const novel = res.body;
	const newNovel = new NovelMessage(novel)
	        try{
	            await newNovel.save()
	            res.status(201).json(newNovel)
	        }catch(err){
	        	res.status(409).json({message : err.message})
	        }
}

