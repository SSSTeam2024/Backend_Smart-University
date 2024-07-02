const mongoose = require('mongoose');


const makeConnection = async () => {
    mongoose.connect('mongodb+srv://smartuniversity3s:2V0nlgVluOQX6Dg0@cluster0.e3s3xpp.mongodb.net/Smart_University', { }).then(()=>{
        console.log('DB connected successfully!');
    });
}

module.exports = makeConnection;