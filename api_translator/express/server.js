require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const routes =require('./routes')
app.use("/", routes);

const { Server } = require('socket.io');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const uri = process.env.DB_URI;
mongoose.connect(uri).then(()=>{
    const server = app.listen(PORT, '0.0.0.0', () => console.log('server is running at port:', PORT));
    require('./sockets/sockets.js')(server);
    // const io = new Server(server, {
    //     cors: {
    //         origin: process.env.CLIENT_ORIGIN,
    //         credentials: true,
    //         methods: ['GET', 'POST']
    //     }
    // })
    // app.set("io", io);
  
})

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
