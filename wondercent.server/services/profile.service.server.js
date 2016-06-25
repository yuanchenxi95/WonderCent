/**
 * Created by ChenxiYuan on 6/24/16.
 */







module.exports = function (app, models) {
    var profileModel = models.profileModel;

    // app.get("/api/user/profile", authenticate, getUserProfile);
    app.post("/api/user/profile", authenticate, updateUserProfile);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function updateUserProfile(req, res) {
        var userId = req.user._id;
        var profile = req.user.profile;

        profileModel.updateUserProfile(profile, userId);
    }

};

