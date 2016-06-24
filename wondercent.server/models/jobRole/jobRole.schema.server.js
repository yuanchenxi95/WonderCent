module.exports = function () {
    var mongoose = require("mongoose");
    var JobRoleSchema = mongoose.Schema({
        role        : {
                        type: String,
                        enum: ['CREATOR', 'ACCEPTOR', 'PENDING']
                    },
        _job        : {type: mongoose.Schema.Types.ObjectId, ref: "Job"}
    });
    return JobRoleSchema;
};
