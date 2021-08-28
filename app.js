const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articles = require('./routes/articlesRoute');
const users = require('./routes/usersRoute');

const PORT = process.env.PORT || 3000;

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/articlehub', {
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log(`Connected to MongoDB. `);
    } else {
        console.log(`Cannot connect to MongoDB: ${err}. `);
    }
});

const app = express();

// use Body-Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Allow-Control-Allow-Origin", "*");
    res.header("Allow-Control-Allow-Origin", "Origin, X-Requested-With, Content_Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.json(200).json({});
    }
    next();
});

app.use('/api/articles', articles);
app.use('/api/users', users);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}. `);
});