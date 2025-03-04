const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

router.get("/fetchallnotes", fetchUser, async function (req, res) {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});

router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Enter a valid title").exists(),
        body("description", "Enter a valid description").isLength({ min: 5 }),
    ],
    async function (req, res) {
        try {
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.put("/updatenote/:id", fetchUser, async function (req, res) {
    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("NOt Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});

router.delete("/deletenote/:id", fetchUser, async function (req, res) {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Note has been Deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

module.exports = router;