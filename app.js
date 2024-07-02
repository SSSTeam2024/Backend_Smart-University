const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");
const AppRouter = require('./routes/appRouter');

const app = express();
app.use(cors({
  origin:  '*',
  methods:["GET", "POST","DELETE","PUT"],
  credentials: true
}));

// app.use(express.static('files'));
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const port = 5000;

mongoose.connect('mongodb+srv://smartuniversity3s:2V0nlgVluOQX6Dg0@cluster0.e3s3xpp.mongodb.net/Smart_University', { });




app.use('/api', AppRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
