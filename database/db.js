const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect("mongodb+srv://test:sparta@cluster0.rx7dw.mongodb.net/minipjt?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;