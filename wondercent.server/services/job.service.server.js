/**
 * Created by ChenxiYuan on 6/24/16.
 */
module.exports = function (app, models) {
    var jobModel = models.jobModel;
    var userModel = models.userModel;
    var jobRoleModel = models.jobRoleModel;

    app.put("/api/job/update", authenticate, updateJob);
    app.post("/api/job/create", authenticate, createJob);
    app.put("/api/job/apply", authenticate, applyJob);
    app.delete("/api/job/delete/:jobId", authenticate, deleteJob);
    app.post("/api/job/update/deleteEmployeeUser", authenticate, deleteEmployeeUser);
    app.post("/api/job/update/deleteRequestedUser", authenticate, deleteRequestUser);
    app.get("/api/job/search/:searchTerm", searchJob);
    app.get("/api/user/jobs/creatingJobs/:userId", authenticate, findCreatorJobForUser);
    app.get("/api/user/jobs/acceptorJobs/:userId", authenticate, findAcceptorJobsForUser);
    app.get("/api/user/jobs/pendingJobs/:userId", authenticate, findPendingJobsForUser);
    app.get("/api/job/:jobId", getJobById);

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Not authenticated");
        } else {
            next();
        }
    }

    function updateJob(req, res) {
        var jobFromClient = req.body.job;
        var jobRoles = req.user.jobRoles;

        for (var i in jobRoles) {
            var jobRole = jobRoles[i];

            var jobRoleJobId = jobRole._job;
            if (jobRoleJobId.toString() === jobFromClient._id) {

                if (jobRole.role.toString() === 'CREATOR') {

                    jobModel
                        .findJobById(jobFromClient._id)
                        .then(
                            function (job) {
                                if (job._employerUser.toString() === req.user._id.toString()) {
                                    return jobModel.updateJob(jobFromClient._id, jobFromClient);
                                } else {
                                    // if the employeeUser is not the request user
                                    return jobModel.findJobById(job._id);
                                }
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

        jobModel
            .findJobById(jobId)
            .then(
                function (job) {
                    if (job._employerUser.toString() === jobId) {
                        res.status(401).send("Employer cannot apply for this job");
                        return;
                    } else {
                        for (var i in job._requestedUsers) {
                            if (job._requestedUsers[i] === userId) {
                                res.status(401).send("Already applied for this job: " + jobId);
                                return;
                            }
                        }
                        job._requestedUsers.push(userId);
                        return jobModel.updateJob(jobId, job);
                    }
                },
                function (error) {
                    return error;
                }
            )
            .then(
                function (job) {
                    var newJobRole = {
                        role: "PENDING",
                        _job: jobId
                    };

                    jobRoleModel
                        .addJobRole(userId, newJobRole)
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
        var user = req.user;
        var jobId = req.params.jobId;

        jobModel
            .deleteJob(jobId)
            .then(
                function (job) {
                    var employerId = job._employerUser;
                    var employeeId = job._employeeUser;
                    var requestedUsersId = job._requestedUsers;

                    //SHOULD HANDLE ERROR
                    jobRoleModel.deleteJobRoleByJobId(jobId, employerId);
                    jobRoleModel.deleteJobRoleByJobId(jobId, employeeId);

                    for (var i in requestedUsersId) {
                        jobRoleModel.deleteJobRoleByJobId(jobId, requestedUsersId[i]);
                    }

                    res.sendStatus(200);

                },
                function (error) {
                    res.status(401).send(error);
                }
            )

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
                            function (job) {
                                job._employeeUser = null;
                                return jobModel.updateJob(job);
                            },
                            function (error) {
                                return error;
                            }
                        )
                        .then(
                            function (job) {
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
        res.status(401).send("Cannot find the job in your jobRoles: " + jobId);
    }

    function deleteRequestUser(req, res) {
        var user = req.user;
        var jobId = req.params.jobId;
        var updatedJob;

        for (var i in req.user.jobRoles) {
            var jobRole = req.user.jobRoles[i];
            if (jobRole._job === jobId) {

                if (jobRole.role === 'ACCEPTOR') {
                    jobModel
                        .findJobById(jobId)
                        .then(
                            function (job) {
                                job._employeeUser = null;
                                return jobModel.updateJob(job);
                            },
                            function (error) {
                                return error;
                            }
                        )
                        .then(
                            function (job) {
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
        res.status(401).send("Cannot find the job in your jobRoles: " + jobId);
    }

    function searchJob(req, res) {
        var searchTerm = req.params.searchTerm;

        jobModel
            .searchJob(searchTerm)
            .then(
                function(jobs) {
                    res.json(jobs);
                },
                function (error) {
                    res.status(401).send(error);
                }
            )

    }


    function findCreatorJobForUser(req, res) {
        var user = req.user;
        var userId = req.params.userId;

        jobModel
            .findJobsByEmployerId(userId)
            .then(
                function (jobs) {
                    res.json(jobs);
                },
                function (error) {
                    res.status(404).send("Unable to find jobs");
                }
            )

    }

    function findAcceptorJobsForUser(req, res) {
        var user = req.user;
        var userId = req.params.userId;

        jobModel
            .findJobsByEmployeeId(userId)
            .then(
                function (jobs) {
                    res.json(jobs);
                },
                function (error) {
                    res.status(404).send("Unable to find jobs");
                }
            )

    }

    function findPendingJobsForUser(req, res) {
        var user = req.user;
        var userId = req.params.userId;

        jobModel
            .findJobsByRequestedUserId(userId)
            .then(
                function (jobs) {
                    res.json(jobs);
                },
                function (error) {
                    res.status(404).send("Unable to find jobs");
                }
            )

    }

    function getJobById(req, res) {
        var jobId = req.params.jobId;

        jobModel
            .findJobById(jobId)
            .then(
                function (job) {
                    res.json(job);
                },
                function (error) {
                    res.status(404).send("Unable to find the job: " + jobId);
                }
            )

    }

};

