import express from 'express';
import bodyParser from 'body-parser';

import postRoute from './routers/posts.js';
import userRoute from './routers/user.js';
import notifyRoute from './routers/notify.js';

import './cloudinary/cloudinary.js';
import '../firebase/services.js';

const app =express()

app.use(bodyParser.json());

app.use("/posts",postRoute)
app.use("/user",userRoute)
app.use("/notify", notifyRoute);


export default app;

//module.exports =app
   