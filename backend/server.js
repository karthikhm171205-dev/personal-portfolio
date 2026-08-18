const dns = require("dns");

// Use Google DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Contact = require("./models/Contact");
const Project = require("./models/Project");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());


// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.send("MY NEW PORTFOLIO SERVER IS WORKING!");

});


// =====================================================
// ADMIN LOGIN
// =====================================================

app.post("/api/admin/login", (req, res) => {

    const { username, password } = req.body;


    // Check username and password
    if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
    ) {

        return res.status(401).json({
            message: "Invalid username or password"
        });

    }


    // Create JWT token
    const token = jwt.sign(
        {
            username: username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );


    res.json({
        message: "Login successful",
        token: token
    });

});


// =====================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// =====================================================

function authenticateAdmin(req, res, next) {

    const authHeader = req.headers.authorization;


    // No Authorization header
    if (!authHeader) {

        return res.status(401).json({
            message: "Authentication required"
        });

    }


    // Expected format:
    // Authorization: Bearer TOKEN

    const parts = authHeader.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {

        return res.status(401).json({
            message: "Invalid authentication format"
        });

    }


    const token = parts[1];


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.admin = decoded;


        next();

    } catch (error) {

        console.error(
            "JWT verification error:",
            error.message
        );


        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

}


// =====================================================
// PROJECTS
// =====================================================


// GET ALL PROJECTS
// Public route
// Visitors can view projects without logging in.

app.get("/api/projects", async (req, res) => {

    try {

        const projects =
            await Project.find();

        res.status(200).json(projects);

    } catch (error) {

        console.error(
            "Project fetch error:",
            error
        );

        res.status(500).json({
            message: "Error fetching projects",
            error: error.message
        });

    }

});


// =====================================================
// CREATE PROJECT
// =====================================================

// Protected route
// Admin must provide JWT token.

app.post(
    "/api/projects",
    authenticateAdmin,
    async (req, res) => {

        try {

            console.log(
                "Authenticated admin:",
                req.admin
            );

            console.log(
                "Project request body:",
                req.body
            );


            const project =
                new Project(req.body);


            const savedProject =
                await project.save();


            console.log(
                "Project saved:",
                savedProject._id
            );


            res.status(201).json({

                message:
                    "Project created successfully",

                project:
                    savedProject

            });

        } catch (error) {

            console.error(
                "Error creating project:",
                error
            );


            res.status(400).json({

                message:
                    "Error creating project",

                error:
                    error.message

            });

        }

    }
);
// =====================================================
// DELETE PROJECT
// =====================================================

// Protected admin route

app.delete(
    "/api/projects/:id",
    authenticateAdmin,
    async (req, res) => {

        try {

            const deletedProject =
                await Project.findByIdAndDelete(
                    req.params.id
                );


            if (!deletedProject) {

                return res.status(404).json({
                    message: "Project not found"
                });

            }


            console.log(
                "Project deleted:",
                deletedProject._id
            );


            res.status(200).json({

                message:
                    "Project deleted successfully",

                project:
                    deletedProject

            });

        } catch (error) {

            console.error(
                "Delete project error:",
                error
            );


            res.status(500).json({

                message:
                    "Error deleting project",

                error:
                    error.message

            });

        }

    }
);

// =====================================================
// CONTACT FORM
// =====================================================

// Public route
// Anyone can send a contact message.

app.post("/api/contact", async (req, res) => {

    console.log(
        "Contact request received"
    );


    console.log(
        "MongoDB readyState:",
        mongoose.connection.readyState
    );


    console.log(
        "Request body:",
        req.body
    );


    try {

        const {
            name,
            email,
            message
        } = req.body;


        // Basic validation
        if (
            !name ||
            !email ||
            !message
        ) {

            return res.status(400).json({

                message:
                    "Name, email and message are required"

            });

        }


        const newContact =
            new Contact({

                name,
                email,
                message

            });


        const savedContact =
            await newContact.save();


        console.log(
            "Contact saved:",
            savedContact._id
        );


        res.status(201).json({

            message:
                "Message saved successfully",

            contact:
                savedContact

        });

    } catch (error) {

        console.error(
            "Contact error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to save message",

            error:
                error.message

        });

    }

});


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
    .connect(
        process.env.MONGO_URI,
        {
            serverSelectionTimeoutMS: 10000
        }
    )

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );


        const PORT =
            process.env.PORT || 5000;


        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );

    })

    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error
        );

    });