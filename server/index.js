const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')

const novelRoutes = require('./routes/novels.js')

const app = express();
const port = 1996;
const uri = "mongodb+srv://AungChanMin:mangodbuseracm@cluster0.ncjx0.mongodb.net/translator?retryWrites=true&w=majority";

app.use(cors())
app.use('/novels', novelRoutes)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
	const collection = client.db("test").collection("devices");
	app.listen(port, ()=>{
		console.log('server is running at http://localhost:', port)
	} )
  // perform actions on the collection object
  client.close();
});
