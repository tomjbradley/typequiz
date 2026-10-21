// NPM Packages
import { Router } from "express";
import { hash } from "bcryptjs";

// Internal Modules
import User from "../models/User.ts";

const router = Router();

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	// Validation
	if (!username) res.status(400).json({ message: "Username is required." });
	if (!password) res.status(400).json({ message: "Password is required." });
	
	if (typeof username !== "string") res.status(400).json({ message: "Username must be a string." });
	if (typeof password !== "string") res.status(400).json({ message: "Password must be a string." });

	if (username.length === 0) res.status(400).json({ message: "Username is required." });
	if (password.length === 0) res.status(400).json({ message: "Password is required." });

	if (username.length > 50) res.status(400).json({ message: "Username must be 50 characters or less." });
	if (password.length > 256) res.status(400).json({ message: "Password must be 256 characters or less." });

	if (await User.exists({ username })) {
		res.status(400).json({ message: "User already exists." });
	}

	const passwordHash = await hash(password, 12);

	const user = await User.create({ username, passwordHash });

	res.sendStatus(201);
});

export default router;
