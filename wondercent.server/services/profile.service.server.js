/**
 * Created by ChenxiYuan on 6/24/16.
 */







module.exports = function (app, models) {
    var userModel = models.profileModel;

    app.post("/api/login", passport.authenticate('wondercent'), login);
    app.post("/api/loggedin", loggedin);
    app.post("/api/register", register);
    app.post("/api/logout", authenticate, logout);
    app.get("/api/user", authenticate, findUserById);
    app.put("/api/user/Email", authenticate, updateUserEmail);
    app.put("/api/user/Password", authenticate, updateUserPassword);
    app.put("/api/user/following", authenticate, addFollowingUser);
    app.delete("/api/user", authenticate, deleteUser);


};

