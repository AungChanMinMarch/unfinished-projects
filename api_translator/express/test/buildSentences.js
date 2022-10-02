const fs = require('fs');
const axios = require('axios')

console.time('start')

fs.readFile('./test/test.json', 'utf-8',  function(err, text){
	const chapter = JSON.parse(text);
	// const i = 3
	// for(let i=0; i<chapter.sentences.length; i++){
		let mm=[];
		let promises =[];
	for(let i=0; i<10; i++){
		const s=chapter.sentences[i].engSentence;
		const uri = `https://api.mymemory.translated.net/get?q=${s}!&langpair=en|my&de=aungchanminmarch@gmail.com`
		promises.push(axios.get(encodeURI(uri)).then(res=>{
			chapter.sentences[i].mmSentence=res.data.responseData.translatedText
			// mm.push(res.responseData.translatedText)
					}).catch(err=>{
			console.log(err);
		}))
	}
	Promise.all(promises).then(()=>{
		fs.writeFile('memory.txt', JSON.stringify(chapter), function(err){
				console.timeEnd('start')
			})

	})
})		