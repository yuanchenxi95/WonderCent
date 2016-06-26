/**
 * Created by ChenxiYuan on 6/25/16.
 */
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
// var FacebookStrategy = require('passport-facebook').Strategy;
//

module.exports = function (app, models) {
    var adminModel = models.adminModel;
    var userModel = models.userModel;
    var jobModel = models.jobModel;
    var jobRoleModel = models.jobRoleModel;
    var profileModel = models.profileModel;


    app.post("/api/admin/login", login);
    // app.get("/api/admin/loggedin", loggedin);
    app.post("/api/admin/register", register);
    app.post("/api/admin/logout", logout);
    app.put("/api/admin/password", updateAdminPassword);
    app.delete("/api/admin/delete/:adminId", deleteAdmin);

    function login(req, res) {
        //TODO
    }

    function register(req, res) {
        //TODO
    }

    function logout(req, res) {
        // TODO
    }

    function updateAdminPassword(req, res) {
        //TODO
    }
    function deleteAdmin(req, res) {
        //TODO
    }
};

