const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const articlesModel = require('../models/articlesModel');

const checkForErrors = (title, description, author, body) => {
    let errors = {};
    let isValid = false;
    if (title === '') {
        errors = {...errors, title: 'This field cannot be empty. '};
    }
    if (description === '') {
        errors = {...errors, body: 'This field cannot be empty. '};
    }
    if (author === '') {
        errors = {...errors, author: 'This field cannot be empty. '};
    }
    if (body === '') {
        errors = {...errors, body: 'This field cannot be empty. '};
    }

    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }

    isValid = true;
    return { isValid, errors };
}

module.exports = {
    getAll: function (req, res) {
        articlesModel.find({}, (err, articles) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.json({articles});
            }
        })
    },
    myArticles: function (req, res) {
        articlesModel.find({authorId: req.authorId}, (err, articles) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.json({articles});
            }
        });
    },
    getArticle: function (req, res) {
        articlesModel.findById(req.params.id, (err, article) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                res.json({article});
            }
        });
    },
    createArticle: function (req, res) {
        const { title, description, author, body } = req.body;
        const authorId = req.authorId;
        const { isValid, errors } = checkForErrors(title, description, author, body);
        if (isValid) {
            const newArticle = new articlesModel({
                title,
                description,
                author,
                authorId: new ObjectId(authorId),
                body
            });
            newArticle.save().then((articleInfo) => {
                res.json({message: 'success.', id: articleInfo._id});
            }).catch((err) => {
                return err;
            });
        } else {
            res.json(errors);
        }
    },
    editArticle: function (req, res) {
        const { title, description, author, body } = req.body;
        const { isValid, errors } = checkForErrors(title, description, author, body);
        const authorId = req.authorId;

        if (isValid) {
            const updatedArticle = {
                title,
                description,
                author,
                authorId: new ObjectId(authorId),
                body
            };
            articlesModel.findByIdAndUpdate(req.params.id, updatedArticle, (err) => {
                if (err) {
                    throw err;
                } else {
                    res.json({message: 'success'});
                }
            });
        } else {
            res.json({errors});
        }
    },
    removeArticle: function (req, res) {
        articlesModel.remove({_id: req.params.id}, err => {
            if (err) {
                throw err;
            } else {
                res.json({message: 'success'});
            }
        })
    },
    isAuthenticated: function (req, res, next) {
        if (!req.headers['authorization']) {
            res.status(403).json({error: "No token provided. "});
        } else {
            const authorizationHeader = req.headers['authorization'];
            const authorizationToken = authorizationHeader.split(' ')[1];

            if (authorizationToken) {
                jwt.verify(authorizationToken, process.env.JWT_KEY, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        res.status(401).json({error: "Failed to authenticate. "});
                    } else {
                        req.authorId = decoded.userId;
                        next();
                    }
                });
            } else {
                res.status(403).json({error: "No token provided. "});
            }
        }
    },
};