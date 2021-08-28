const ObjectId = require('mongoose').Types.ObjectId;
const articlesModel = require('../models/articlesModel');

const checkForErrors = (title, author, body) => {
    let errors = {};
    let isValid = false;
    if (title === '') {
        errors = {...errors, title: 'This field cannot be empty. '};
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
        const { title, author, body, authorId } = req.body;
        const { isValid, errors } = checkForErrors(title, author, body);

        if (isValid) {
            const newArticle = new articlesModel({
                title,
                author,
                authorId: new ObjectId(authorId),
                body
            });

            newArticle.save().then(() => res.json({message: 'success.'})).catch((err) => {
                return err;
            });
        } else {
            res.json(errors);
        }
    },
    editArticle: function (req, res) {
        const { title, author, body, authorId } = req.body;
        const { isValid, errors } = checkForErrors(title, author, body);

        if (isValid) {
            const updatedArticle = {
                title,
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
    }
};