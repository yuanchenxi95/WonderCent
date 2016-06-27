module.exports = function () {
    var mongoose = require("mongoose");
    var ProfileSchema = mongoose.Schema({
        firstName   : String,
        lastName    : String,
        gender      : {
                        type: String,
                        enum: ['MALE', 'FEMALE', 'NOT_SPECIFIED']
                    },
        profileImage: String,
        major       : String,
        field       : String,
        description : String,
        pDF         : String,
        _userId     : {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    });
    return ProfileSchema;
};
