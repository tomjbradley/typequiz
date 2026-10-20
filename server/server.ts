// NPM Packages
import { connect as connectDb } from "mongoose";
import express from "express";
import { json as jsonParser } from "body-parser";

// Internal Modules
import userRoutes from "./routes/userRoutes.ts";
import tokenRoutes from "./routes/tokenRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";

// Configuration
connectDb(process.env.MONGODB_URI).then(() => console.log("Database connected."));

// App Initialisation
const app = express();

// App Configuration
app.use(jsonParser());
import "./config/passport.ts";

// Routing
app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/quizzes", quizRoutes);

app.listen(5000, () => console.log("Server listening on port 5000."));
