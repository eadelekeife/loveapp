const express = require("express");
const { userModel } = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log("hello there my love")
    res.json("I am running")
});

app.post("/create-user", async (req, res) => {
    let { name, gender, interested_in, spec, username, password, email_address } = req.body;
    await userModel.findOne({
        email_address
    })
        .then(user => {
            if (!user) {
                let newUser = new userModel();

                newUser.name = name;
                newUser.gender = interested_in;
                newUser.spec = spec;
                newUser.username = username;
                newUser.password = password;
                newUser.email_address = email_address;
                newUser.gender = gender;
                newUser.save();

                res.json({
                    status: "success",
                    message: "User signup successful",
                    data: ""
                })
            } else {
                res.json({
                    status: "error",
                    message: "There is already a user with this email address",
                    data: ""
                })
            }
        }).catch(err => {
            res.json({
                status: "error",
                message: "An error occurred while saving data",
                data: ""
            })
        })
});

app.post("/login", async (req, res) => {
    let { password, email_address } = req.body;
    await userModel.findOne({
        email_address
    })
        .then(user => {
            if (!user) {
                res.json({
                    status: "error",
                    message: "User email not found",
                    data: ""
                })
            } else {
                if (user.password === password) {
                    res.json({
                        status: "success",
                        message: "User signin successful",
                        data: user
                    })
                } else {
                    res.json({
                        status: "error",
                        message: "User password is not correct",
                        data: ""
                    })
                }
            }
        }).catch(err => {
            res.json({
                status: "error",
                message: "An error occurred while saving data",
                data: ""
            })
        })
});

app.get("/user/:id", async (req, res) => {
    await userModel.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.json({
                    status: "error",
                    message: "User not found",
                    data: ""
                })
            } else {
                res.json({
                    status: "success",
                    message: "User found successful",
                    data: user
                })
            }
        }).catch(err => {
            res.json({
                status: "error",
                message: "An error occurred while fetching data",
                data: ""
            })
        })
});

app.post("/find-lover", async (req, res) => {
    res.json({
        status: "success",
        message: "We have found some girls for you. Pick your choice",
        data: [
            {
                name: "Cynthia Morgan",
                complexion: "fair",
                hair_color: "orange",
                occupation: "musician"
            },
            {
                name: "Omawumi Megbele",
                complexion: "dark",
                hair_color: "black",
                occupation: "musician"
            },
            {
                name: "Storm Rex",
                complexion: "fair",
                hair_color: "black",
                occupation: "musician"
            },
            {
                name: "Tiwa Savage",
                complexion: "dark",
                hair_color: "black",
                occupation: "musician"
            },
            {
                name: "Simi",
                complexion: "dark",
                hair_color: "black",
                occupation: "musician"
            },
            {
                name: "Yemi Alade",
                complexion: "fair",
                hair_color: "black",
                occupation: "musician"
            }
        ]
    })
});


const port = process.env.PORT || 8080;
app.listen(port, console.log("app started listening on port", port));