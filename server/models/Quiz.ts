import { Schema, model } from "mongoose";

const quizSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	memoranda: { type: [ String ], required: true },
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Quiz = model("Quiz", quizSchema);

export default Quiz;
