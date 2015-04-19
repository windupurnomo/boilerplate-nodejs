var bCrypt = require('bcrypt-nodejs');
var config = require('../config');
var db = require('../models/database');
var jwt = require("jsonwebtoken");
var fs = require('fs');

var h = {
    authorize: function(req, res, next) {
        var bearerToken;
        var decoded;
        var bearerHeader = req.headers["authorization"];
        db.Module.find(function (e, modules){
            var module = getRequestURL(req.url, modules);
            if (module == null) {
                console.log('not registered');
                res.sendStatus(403);
                return;
            }
            else if (module.roles.indexOf(config.anonim) != -1) {
                next();
                return;
            }else{
                if (typeof bearerHeader == 'undefined') {
                    res.sendStatus(403);
                    return;
                }
                var bearer = bearerHeader.split(" ");
                bearerToken = bearer[1];
                req.token = bearerToken;
                try {
                    decoded = jwt.verify(bearerToken, config.jwt_key);
                    req.user = decoded;
                } catch (err) {
                    res.sendStatus(403);
                    return;
                }
                db.Module.findOne(q, function(err, au) {
                    if (err || au == null) res.sendStatus(403);
                    else if (au.roles.indexOf(decoded.role) != -1 || 
                        decoded.role == config.kawasa) next();
                    else res.sendStatus(403);
                });
            }
        });
    },

    stdResponse: function (error, data, res){
        if (error) res.json({status: false, message: error});
        else res.json({status: true, data: data});
    },

    comparePassword: function(hashedPassword, plainPassword) {
        return bCrypt.compareSync(plainPassword, hashedPassword);
    },

    createHash: function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    },

    createRandomNum: function(n) {
        var text = "";
        var possible = "0123456789";
        for (var i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },

    createRandomAlphaNum: function(n) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

};

module.exports = h;


function getRequestURL(url, modules){
    for(var i=0; i<modules.length; i++){
        if (url.indexOf(modules[i]) > -1) return 
            modules[i];
    }
    return null;
}
