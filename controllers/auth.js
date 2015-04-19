var jwt = require("jsonwebtoken");
var db = require('../models/database');
var helper = require('./helper');
var config = require('../config');

var auth = {

    login: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        console.log(email, password);
        validate(email, password, function(result) {
            if (!result.user) {
                res.status(401);
            } else {
                res.json({
                    status: true,
                    data: result.user,
                    token: result.user.token
                });
            }
        });
    },

    test: function (req, res){
        var data = [
            {id: '9088a89u4asd892j8lasd', recipient: '08978886546', message: 'hello world1..', status: 0},
            {id: '9088a89u4asd892j8lase', recipient: '08978886544', message: 'hello world2..', status: 0},
            {id: '9088a89u4asd892j8lasf', recipient: '08978886543', message: 'hello world3..', status: 0},
            {id: '9088a89u4asd892j8lasg', recipient: '08978886542', message: 'hello world4..', status: 0},
        ];
        res.json({
            status: true,
            data: data
        });
    }
}

function validate(email, password, callback) {
    var q = {$or:[{email: email}, {username: email}]};
    db.User.findOne(q)
        .populate('company')
        .exec(function(err, user) {
        if (user == null) {
            return callback({
                user: null,
                message: 'Email tidak valid'
            });
        } else if (!helper.comparePassword(user.password, password)) {
            return callback({
                user: null,
                message: 'Password tidak valid'
            });
        } else if (user.status == 0) {
            return callback({
                user: null,
                message: 'Akun belum diaktivasi'
            });
        }else if (user.status == 2) {
            return callback({
                user: null,
                message: 'Akun anda di-non-aktifkan silahkan hubungi admin melalui email: alpukat-support@gmail.com'
            });
        } else {
            var xuser = {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                company: user.company
            };
            user.token = jwt.sign(xuser, config.jwt_key);
            user.save(function (err, u){
                return callback({
                    user: u
                });
            })
        }
    });
}

module.exports = auth;