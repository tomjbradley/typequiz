// NPM Packages
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import { compare } from "bcryptjs";

// Internal Modules
import User from "../models/User.ts";

passport.use(new LocalStrategy(async (username, password, done) => {
	const user = await User.findOne({ username });

	if (!user) return done(null, false);
	if (!(await compare(password, user.passwordHash))) return done(null, false);

	return done(null, user);
}));

passport.use(new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET }, async (payload, done) => {
	const user = await User.findById(payload.id).select("_id username");

	if (!user) return done(null, false);

	return done(null, user);
}));

export default passport;
