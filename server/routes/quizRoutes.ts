// NPM Packages
import { Router } from "express";
import passport from "passport";

// Internal Modules
import Quiz from "../models/Quiz.ts";

const router = Router();

router.get("/", async (req, res) => {
	const quizzes = await Quiz.find({});

	res.status(200).json(quizzes);
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
	const { name, description, memoranda } = req.body;

	// Validation
	if (!name) res.status(400).json({ message: "Name is required." });
	if (!memoranda) res.status(400).json({ message: "Memoranda is required." });
	
	if (typeof name !== "string") res.status(400).json({ message: "Name must be a string." });
	if (description && typeof description !== "string") res.status(400).json({ message: "Description must be a string." });
	if (!Array.isArray(memoranda) || typeof memoranda[0] !== "string") res.status(400).json({ message: "Memoranda must be an array of strings." });

	if (name.length > 100) res.status(400).json({ message: "Name must be 100 characters or less." });
	if (description && description.length > 2000) res.status(400).json({ message: "Description must be 2000 characters or less." });
	if (memoranda.length === 0) res.status(400).json({ message: "At least one memorandum is required." });

	const quiz = await Quiz.create({ name, description, memoranda, userId: req.user.id });

	res.status(201).json(quiz);
});

export default router;
