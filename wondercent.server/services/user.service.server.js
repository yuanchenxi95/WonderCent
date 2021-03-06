/**
 * Created by ChenxiYuan on 6/24/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (app, models) {
    var userModel = models.userModel;
    var jobModel = models.jobModel;
    var jobRoleModel = models.jobRoleModel;
    var profileModel = models.profileModel;

    app.post("/api/login", passport.authenticate('wondercent'), login);
    app.get("/api/loggedin", loggedin);
    app.post("/api/register", register);
    
    app.post("/api/logout", authenticate, logout);
    // app.put("/api/user/email", authenticate, updateUserEmail);
    app.put("/api/user/password", authenticate, updateUserPassword);
    app.put("/api/user/follow", authenticate, addFollowingUser);
    app.delete("/api/user", authenticate, deleteUser);



    passport.use('wondercent', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function serializeUser(user, done) {
        done(null, user);
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
                    } else if (user.softDelete === true) {
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

    function login(req, res) {
        var user = req.user;
        res.json(user);

    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function register(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        userModel
            .findUserByEmail(email)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("email already exists");
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        return userModel.createUser(req.body);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }


   

    // function updateUserEmail(req, res) {
    //     var user = req.body.email;
    //     var userId = user._id;
    //
    //     userModel
    //         .updateEmail(userId, user.email)
    //         .then(
    //             function (user) {
    //                 res.json(user);
    //             },
    //             function (error) {
    //                 res.status(400).send("SeverError: Cannot update the email");
    //             }
    //         );
    // }

    function updateUserPassword(req, res) {
        var password = req.body.password;
        var userId = req.user._id;
        
        userModel
            .updatePassword(userId, bcrypt.hashSync(password))
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("SeverError: Cannot update the password");
                }
            );
    }

    function deleteUser(req, res) {
        var user = req.user;
        var userId = user._id;

        // soft delete

        var newProfile = {
            firstName   : "Unregistered",
            lastName    : "Unregistered",
            gender      : 'NOT_SPECIFIED',
            profileImage: "",
            major       : "",
            field       : "",
            description : "",
            pDF         : ""
        };

        profileModel
            .updateProfile(newProfile, userId)
            .then(
                function (profile) {
                    return userModel.softDeleteUser(userId);
                },
                function (error) {
                    return error;
                }
            )
            .then(
                function (user) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove the user: " + userId);
                }
            );
    }

    // req.body should be the user ID which need to be added to the following list
    function addFollowingUser(req, res) {
        var user = req.user;
        var userId = user._id;
        var addingId = req.body.addingId;

        if(userId.toString() == addingId) {
            res.status(404).send("Unable to follow the user");
        }


        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    for(var i in user._followingUsers) {
                        if (user._followingUsers[i].toString() === addingId) {
                            res.status(401).send("Already followed user: " + addingId);
                            return;
                        }
                    }

                    return userModel.addFollowingUser(userId, addingId)

                },
                function (error) {
                    return error;
                }
            )
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("Unable to follow the user");
                }
            )


    }
    


};

