// NPM Packages
import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err) return next(err);

		if (!user) {
			return res.status(401).json({ message: "Invalid username or password." });
		}

		const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);

		return res.status(200).json({ token });
	})(req, res, next);
});

export default router;
