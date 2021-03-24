const express = require("express")
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const postRoute = require('./routes/post');

// Connect to database
const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log("Database connected successfully"), (error)=>{
        console.log(err);
        console.log("Connecting again in 1 second ...");
        setTimeout(()=>{
            connectDatabase();
        },1000)
    })
}
connectDatabase();

// Import routes
const authRouter = require('./routes/auth');

//Midleware
app.use(express.json());

// Route middleware
app.use("/api/user", authRouter);
app.use("/api/post", postRoute);


app.listen(port ,()=> console.log(`Listening on port ${port}`));