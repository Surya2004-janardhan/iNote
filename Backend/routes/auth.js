const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const router = express.Router();
const JWT_SECRET = "AvinashIsaGoodBoy.";

router.post(
    "/createuser",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid Email address").isEmail(),
        body("password", "must have at least 5 characters").isLength({ min: 5 }),
    ],
    async function (req, res) {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({
                $or: [
                    { email: req.body.email },
                    { name: req.body.name }
                ]
            });
            if (user) {
                return res.status(400).json({ success, message: "Sorry, a user with this email or name already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success, message: "Internal Server Error" });
        }
    }
);

router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async function (req, res) {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id,
                },
            };
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success, message: "Internal Server Error" });
        }
    }
);

router.post("/getuser", fetchUser, async function (req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;