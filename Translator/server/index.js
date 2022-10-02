const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// app.use('/posts', postRoutes);
// app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://AungChanMin:mangodbuseracm@cluster0.ncjx0.mongodb.net/translator?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 2000;

// mongoose.connect(CONNECTION_URL)
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  app.listen(PORT, ()=>{console.log("running at port 2000")})
  client.close();
});