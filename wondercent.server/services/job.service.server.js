/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function (app, models) {
    var jobModel = models.jobModel;
    var userModel = models.userModel;
    var jobRoleModel = models.jobRoleModel;

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

    app.put("/api/job/update", authenticate, updateJob);
    app.post("/api/job/create", authenticate, createJob);
    app.put("/api/job/apply", authenticate, applyJob);
    app.delete("/api/job/delete", authenticate, deleteJob);
    app.post("/api/job/update/deleteEmployeeUser", authenticate, deleteEmployeeUser);
    app.post("/api/job/update/deleteRequestedUser", authenticate, deleteRequestUser);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Not authenticated");
        } else {
            next();
        }
    }

    function updateJob(req, res) {
        var jobFromClient = req.body.job;

        // should get user from the database
        for (var i in req.user.jobRoles) {
            var jobRole = req.user.jobRoles[i];

            if (jobRole._job === jobFromClient._id) {

                if (jobRole.role === 'CREATOR'
                    && req.user._id === jobFromClient._employerUser) {

                    jobModel.findJobById(jobFromClient._id)
                        .then(
                            function (job) {
                                return jobModel.updateJob(jobFromClient._id, jobFromClient);
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

                return;

            }

        }

        res.status(401).send("Job not found");


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

    function createJob(req, res) {
        var userId = req.user._id;

        var newJob = req.body.job;

        newJob._employerUser = req.user._id;

        jobModel
            .createJob(newJob)
            .then(
                function (job) {
                    newJob = job;
                    var newJobRole = {
                        role: 'CREATOR',
                        _job: job._id
                    };
                    return jobRoleModel.addJobRole(newJobRole, userId);

                },
                function (error) {
                    return error;
                }
            )
            .then(
                function (user) {
                    res.status(200).send(newJob);
                },
                function (error) {
                    res.status(401).send(error);
                }
            );


    }

    function applyJob(req, res) {
        var userId = req.user._id;
        var jobId = req.body.jobId;

        var newJobRole = {
            role: "PENDING",
            _job: jobId
        };

        jobRoleModel
            .addJobRole(userId, newJobRole)
            .then(
                function (user) {
                    return jobModel.findJobById(jobId)
                },
                function (error) {
                    return error;
                }
            )
            .then(
                // update job
                function (job) {
                    for (var i in job._requestedUsers) {
                        if (job._requestedUsers[i] === userId) {
                            res.status(401).send("Already applied for this job: " + jobId);
                            return;
                        }
                    }

                    job._requestedUsers.push(userId);

                    return jobModel.updateJob(jobId, job);
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
                    res.status(401).send(error);
                }
            );

    }

    function deleteJob(req, res) {
        //TODO
    }

    function deleteEmployeeUser(req, res) {
        var user = req.user;
        var jobId = req.body.jobId;
        var updatedJob;

        for (var i in req.user.jobRoles) {
            var jobRole = req.user.jobRoles[i];
            if (jobRole._job === jobId) {

                if (jobRole.role === 'ACCEPTOR') {
                    jobModel
                        .findJobById(jobId)
                        .then(
                            function(job) {
                                job._employeeUser = null;
                                return jobModel.updateJob(job);
                            },
                            function (error) {
                                return error;
                            }
                        )
                        .then(
                            function(job) {
                                updatedJob = job;
                                jobRoleModel.deleteJobRole(jobRole._id, user._id);
                            },
                            function (error) {
                                return error;
                            }
                        )
                        .then(
                            function (user) {
                                res.json(updatedJob);
                            },
                            function (error) {
                                res.status(401).send(error);
                            }
                        )

                } else {
                    res.status(401).send("You arr not authorized to cancel the employee of job: " + jobId);
                }


                return;
            }


        }
        res.status(401).send("Cannot find the job in your jobRoles: " + jobId)
    }

    function deleteRequestUser(req, res) {
        // TODO
    }
};

