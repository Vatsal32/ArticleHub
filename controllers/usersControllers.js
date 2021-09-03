const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const checkUserUniqueness = async (field, value) => {
    let error, isUnique;
    ({error, isUnique} = await usersModel.findOne({[field]: value}).exec().then(
        (user) => {
            let res = {};
            if (Boolean(user)) {
                res = {error: {[field]: `This ${value} is not available. `}, isUnique: false};
            } else {
                res = {error: {[field]: ''}, isUnique: true};
            }
            return res;
        }
    ));
    return {error, isUnique};
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const checkForErrors = async function (reqBody) {
    const password = reqBody['password'];
    const confirmPassword = reqBody['confirmPassword'];

    let errors = {};
    for (let field of Object.keys(reqBody)) {
        if (reqBody[field] === '') {
            errors = {...errors, [field]: 'This field is required.'};
        }
        if (field === 'userName' || field === 'email') {
            const value = reqBody[field];
            const {error, isUnique} = await checkUserUniqueness(field, value);
            if (!isUnique) {
                errors = {...errors, ...error};
            }
        }
        if (field === 'email' && !validateEmail(reqBody[field])) {
            errors = {...errors, [field]: 'Not a valid email. '};
        }
        if (field === 'password' && password !== '' && password.length < 6) {
            errors = {...errors, [field]: 'Password is too short. '};
        }
        if (field === 'confirmPassword' && confirmPassword !== password) {
            errors = {...errors, [field]: 'Passwords does not match. '};
        }
    }
    return errors;
}

module.exports = {
    register: async (req, res) => {
        const name = req.body.name || '';
        const userName = req.body.userName || '';
        const email = req.body.email || '';
        const password = req.body.password || '';
        const confirmPassword = req.body.confirmPassword || '';
        const reqBody = {name, userName, email, password, confirmPassword};

        let errors = await checkForErrors(reqBody);
        if (Object.keys(errors).length > 0) {
            res.json({message: 'Incorrect inputs. ', errors});
        } else {
            const newUser = new usersModel({
                name,
                userName,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return err;
                } else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            return err;
                        } else {
                            newUser.password = hash;
                            newUser.save().then(() => {
                                res.json({message: 'success. '});
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    });
                }
            });
        }
    },
    authenticate: (req, res) => {
        const userName = req.body.userName || '';
        const password = req.body.password || '';

        let errors = {};

        if (userName === '') {
            errors = {...errors, userName: 'This is required field. '};
        }
        if (password === '') {
            errors = {...errors, password: 'This is required field. '};
        }

        if (Object.keys(errors).length > 0) {
            res.json({errors});
        } else {
            usersModel.findOne({userName: userName}, (err, userInfo) => {
                if (err) {
                    return err;
                }
                if (Boolean(userInfo)) {
                    bcrypt.compare(password, userInfo.password, (err, isMatch) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                        if (isMatch) {
                            const token = jwt.sign({
                                userId: userInfo._id,
                                name: userInfo.name,
                            }, process.env.JWT_KEY, {expiresIn: '1h'});
                            res.json({message: 'User signed in successfully. ', data: {token: token}});
                        } else {
                            res.json({invalidCredentials: 'Invalid Username or Password. '});
                        }
                    });
                } else {
                    res.json({invalidCredentials: 'Invalid Username or Password. '});
                }
            })
        }
    },
};