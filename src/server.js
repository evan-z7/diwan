import http from 'http';
import express from 'express';
// import app from './app.js';
const port = process.env.PORT || 3000   

import bodyParser from 'body-parser';
const app =express();

import postRoute from './routers/posts.js';
import userRoute from './routers/user.js';
import notifyRoute from './routers/notify.js';
import './cloudinary/cloudinary.js';
import '../firebase/services.js';
app.use(bodyParser.json());

app.use("/posts",postRoute)
app.use("/user",userRoute)
app.use("/notify", notifyRoute);

/*
import express from 'express';
*/
//routers
// app.use("/apps", app);

//static images
app.use('/images',express.static('./images'))

//create connect with the server
const server = http.createServer(app)
//testing the port page
app.get('/', (req, res)=>{ res.send('hello')})
//listen to the port
server.listen(port,console.log('hello from port '+ port))




