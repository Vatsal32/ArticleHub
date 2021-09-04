const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articles = require('./routes/articlesRoute');
const users = require('./routes/usersRoute');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}. `);
});
