/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function (app, models) {
    var jobModel = models.jobModel;

    // var JobSchema = mongoose.Schema({
    //     _employerUser    : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    //     _employeeUser    : {type: mongoose.Schema.Types.ObjectId, ref: "User"}, *
    //     _requestedUsers  : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}], *
    //
    //     price          : Number,
    //     // set default due date to 2099-01-01
    //     dateDue         : {type: Date, default: new Date('2099-01-01')},
    //
    //     name            : String,
    //     description     : String,
    //     tags            : [String],
    //     imageUrl        : String,
    //
    //     dateCreated     : {type: Date, default: Date.now()},
    //     softDelete      : {type: Boolean, default: false}
    // }, {collection: "wondercent.job"});

    app.post("/api/job/", authenticate, updateJob);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Not authenticated");
        } else {
            next();
        }
    }

    function updateJob(req, res) {
        var job = req.body.job;

        for (var i in req.user.jobRoles) {
            var jobRole = req.user.jobRoles[i];

            if (jobRole._job === job._id) {
                switch (jobRole.role) {
                    case 'CREATOR':
                        updateJobAllFields(req, res, job);
                        break;
                    case 'ACCEPTOR':
                        updateJobEmployee(req, res, job);
                        break;
                    case 'PENDING' :
                        updateJobRequestedUsers(req, res, job);
                        break;
                    default:
                        res.status(401).send("Invalid jobRole");
                }
            }

        }


    }

    function updateJobAllFields(req, res, jobFromClient) {
        if (req.user._id === job._employerUser) {
            jobModel.findJobById(jobFromClient._id)
                .then(
                    function (job) {
                        return jobModel.updateJob(jobFromClient._id,  jobFromClient);
                    },
                    function (error) {
                        return error;
                    }
                )
                .then(
                    function (job) {
                        res.json(job);
                    },
                    function (error) {
                        res.status(401).send(error);
                    }
                );
        } else {
            res.status(401).send("Not authenticated");
        }
    }

    function updateJobEmployee(req, res, jobFromClient) {

        jobModel.findJobById(jobFromClient._id)
            .then(
                function (job) {
                    var jobUpdated = job;
                    jobUpdated._employeeUser = jobFromClient._employeeUser;
                    return jobModel.updateJob(jobFromClient._id, jobUpdated);
                },
                function (error) {
                    return error;
                }
            )
            .then(
                function (job) {
                    res.json(job);
                },
                function (error) {
                    res.status(401).send(error);
                }
            );

    }

    function updateJobRequestedUsers(req, res, jobFromClient) {
        jobModel.findJobById(jobFromClient._id)
            .then(
                function (job) {
                    var jobUpdated = job;
                    jobUpdated._employeeUser = jobFromClient._employeeUser;
                    return jobModel.updateJob(jobFromClient._id, jobUpdated);
                },
                function (error) {
                    return error;
                }
            )
            .then(
                function (job) {
                    res.json(job);
                },
                function (error) {
                    res.status(401).send(error);
                }
            );



    }

};

