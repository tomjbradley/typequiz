import { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { Spinner, ButtonGroup, Button, Input } from "reactstrap";

import { useAuth } from "../AuthContext.tsx";
import type { QuizMetadata } from "../types/quiz.ts";

interface Memorandum {
	memorandum: string;
	recalled: boolean;
}

export default function Quiz() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [quizMetadata, setQuizMetadata] = useState<QuizMetadata | null>(null);
	const [memoranda, setMemoranda] = useState<Memorandum[]>([]);
	const [isTesting, setIsTesting] = useState(false);
	const [input, setInput] = useState("");

	const { quizId } = useParams();

	useEffect(() => {
		(async () => {
			const res = await fetch(`https://typequiz.onrender.com/quizzes/${quizId}`);
			const data = await res.json();

			const { _id, name, description, memoranda, userId } = data;

			setQuizMetadata({ _id, name, description, userId });
			setMemoranda(memoranda.map((memorandum: Memorandum) => ({ memorandum, recalled: false })));
		})();
	}, []);

	const handleInput = (event: FormEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;

		setInput(value);

		if (!memoranda.some(({ recalled, memorandum }) => !recalled && memorandum === value)) return;

		setMemoranda((prev) => { return prev.map((memorandum) => {
				return memorandum.memorandum === value ? { ...memorandum, recalled: true } : memorandum;
			});
		});
		
		setInput("");
	}

	const deleteQuiz = async () => {
		const token = localStorage.getItem("token");

		await fetch(`https://typequiz.onrender.com/quizzes/${quizMetadata._id}`, { method: "DELETE", headers: { "Authorization" : `Bearer ${token}` }});

		navigate("/");
	}

	return (
		<section>
			{quizMetadata ? (
				<div className="stack">
					<h1>{quizMetadata.name}</h1>
					<p>{quizMetadata.description}</p>
					{ isTesting ? ( 
						<div>
							<small>{memoranda.reduce((acc, curr) => curr.recalled ? acc + 1 : acc, 0)} / {memoranda.length} recalled</small>
							<Input value={input} onInput={handleInput} />
							<Button className="mt-2" color="danger" size="sm">Give Up</Button>
						</div>
					) : (
						<ButtonGroup>
							<Button color="success" onClick={() => setIsTesting(true)}>Start</Button>
							{user && user._id === quizMetadata.userId && <Button color="danger" onClick={deleteQuiz}>Delete</Button>}
						</ButtonGroup>
					)}
					<ul className="auto-grid">
						{memoranda.map(({ memorandum, recalled }, idx) => <li key={idx}>{recalled ? memorandum : "\u00A0"}</li>)}
					</ul>
				</div>
			) : <Spinner />}
		</section>
	);
}

