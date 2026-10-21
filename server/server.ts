// NPM Packages
import { connect as connectDb } from "mongoose";
import express from "express";
import { json as jsonParser } from "body-parser";
import cors from "cors";

// Internal Modules
import userRoutes from "./routes/userRoutes.ts";
import tokenRoutes from "./routes/tokenRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";

// Configuration
connectDb(process.env.MONGODB_URI).then(() => console.log("Database connected."));

// Runtime Constants
const PORT = process.env.PORT ?? 5000;

// App Initialisation
const app = express();

// App Configuration
app.use(cors());
app.use(jsonParser());
import "./config/passport.ts";

// Routing
app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/quizzes", quizRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
