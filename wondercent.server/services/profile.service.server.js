/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function (app, models) {
    var profileModel = models.profileModel;
    var userModel = models.userModel;

    // app.get("/api/user/profile", authenticate, getUserProfile);
    app.put("/api/user/profile", authenticate, updateUserProfile);
    app.get("/api/user/profile/:userId", findUserProfileById);
    app.get("/api/user/profile/search/:searchTerm", findUserProfileByKeyword);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function updateUserProfile(req, res) {
        var user = req.user;
        var userId = user._id;
        var profile = req.body.profile;

        profileModel
            .updateProfile(profile, userId)
            .then(
                function(profile) {
                    res.json(profile);
                },
                function (error){
                    res.status(400).send(error);
                }
            );
    }

    function findUserProfileById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user.profile);
                },
                function (error) {
                    res.status(400).send("UserId " + userId + " not found");
                }
            );
    }

    function findUserProfileByKeyword(req, res) {
        var keyword = req.params.searchTerm;
        profileModel
            .findProfileByKeyword(keyword)
            .then(
                function(profiles) {
                    res.json(profiles);
                },
                function(error) {
                    res.status(401).send("Could not find profiles by keyword! Error: " + error);
                }
            );
    }

};

