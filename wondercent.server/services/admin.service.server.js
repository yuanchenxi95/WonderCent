/**
 * Created by ChenxiYuan on 6/25/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (app, models) {
    var adminModel = models.adminModel;
    var userModel = models.userModel;
    var jobModel = models.jobModel;
    var jobRoleModel = models.jobRoleModel;
    var profileModel = models.profileModel;

    // app.post("/api/login", passport.authenticate('wondercent'), login);
    // app.get("/api/loggedin", loggedin);
    // app.post("/api/register", register);
    //
    // app.post("/api/logout", authenticate, logout);
    // // app.put("/api/user/email", authenticate, updateUserEmail);
    // app.put("/api/user/password", authenticate, updateUserPassword);
    // app.put("/api/user/following", authenticate, addFollowingUser);
    // app.delete("/api/user", authenticate, deleteUser);




    passport.use('wondercentAdmin', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function serializeUser(admin, done) {
        done(null, admin);
    }

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Not authenticated");
        } else {
            next();
        }
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function localStrategy(email, password, done) {
        userModel
            .findUserByEmail(email)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    } else if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
    }


};

