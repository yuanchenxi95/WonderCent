/**
 * Created by ChenxiYuan on 6/24/16.
 */

module.exports = function(app) {

    // load model
    var model = require("./models/model.js");
    
    

    // TODO load Service
    // e.g. var userService = require("./services/user.service.server.js")(app, model);
    var userService = require("./services/user.service.server.js")(app, model);

    // test
  // app.get("/test/:message", function (req, res) {
  //    var msg = req.params.message;
  //     console.log(msg);
  //     res.send({message: msg});
  // });
};