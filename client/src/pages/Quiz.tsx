import { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner, ButtonGroup, Button, Input } from "reactstrap";

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
	const [mode, setMode] = useState("default");
	const [input, setInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const { quizId } = useParams();

	useEffect(() => {
		(async () => {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}`);
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

		setInput("");

		setMemoranda((prev) => { return prev.map((memorandum) => {
				return memorandum.memorandum === value ? { ...memorandum, recalled: true } : memorandum;
			});
		});
	}

	useEffect(() => {
		if (memoranda.length > 0 && memoranda.every((memo) => memo.recalled)) {
			setMode("completed");
			setIsOpen(true);
		}
	}, [memoranda]);

	const deleteQuiz = async () => {
		const token = localStorage.getItem("token");

		if (!quizMetadata) return;

		await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quizMetadata._id}`, { method: "DELETE", headers: { "Authorization" : `Bearer ${token}` }});

		navigate("/");
	}

	const retry = () => {
		setMemoranda((prev) => prev.map((memo) => ({ ...memo, recalled: false })));
		setMode("testing");
	}

	const toggle = () => setIsOpen(!isOpen);

	return (
		<section>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Well Done</ModalHeader>
				<ModalBody>You've completed the quiz!</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => {toggle();retry();}}>Retry</Button>
					<Button color="danger" onClick={toggle}>Close</Button>

				</ModalFooter>
			</Modal>
			{quizMetadata ? (
				<div className="stack">
					<h1>{quizMetadata.name}</h1>
					<p>{quizMetadata.description}</p>
					{ (mode !== "testing") && ( 
						<ButtonGroup>
							{ mode !== "default" ? (
								<Button color="success" onClick={retry}>Retry</Button>
							) : (
								<Button color="success" onClick={() => setMode("testing")}>Start</Button>
							)}
							{user && user._id === quizMetadata.userId && <Button color="danger" onClick={deleteQuiz}>Delete</Button>}
						</ButtonGroup>
					)}
					<div>
						{(mode !== "default") && (
							<small>{memoranda.reduce((acc, curr) => curr.recalled ? acc + 1 : acc, 0)} / {memoranda.length} recalled</small>
						)}
						{mode === "testing" && (
							<>
								<Input value={input} onInput={handleInput} />
								<Button className="mt-2" color="danger" size="sm" onClick={() => setMode("give-up")}>Give Up</Button>
							</>
						)}
					</div>
					<ul className="auto-grid">
						{memoranda.map(({ memorandum, recalled }, idx) => <li style={{ color: mode === "give-up" && !recalled ? "red" : "black" }} key={idx}>{(mode === "give-up" || mode === "completed" || (mode === "testing" && recalled)) ? memorandum : "\u00A0"}</li>)}
					</ul>
				</div>
			) : <Spinner />}
		</section>
	);
}

