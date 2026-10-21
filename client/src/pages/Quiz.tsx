import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Spinner, Button, Input } from "reactstrap";

const Quiz = () => {
	const [quizMetadata, setQuizMetadata] = useState(null);
	const [memoranda, setMemoranda] = useState([]);
	const [isTesting, setIsTesting] = useState(false);
	const [input, setInput] = useState("");

	const { quizId } = useParams();

	useEffect(() => {
		(async () => {
			const res = await fetch(`https://typequiz.onrender.com/quizzes/${quizId}`);
			const data = await res.json();

			const { name, description, memoranda } = data;

			setQuizMetadata({ name, description });
			setMemoranda(memoranda.map((memorandum) => ({ memorandum, recalled: false })));
		})();
	}, []);

	const handleInput = (event) => {
		const { value } = event.target;

		setInput(value);

		if (!memoranda.some(({ recalled, memorandum }) => !recalled && memorandum === value)) return;

		setMemoranda((prev) => {
			return prev.map((memorandum) => {
				return memorandum.memorandum === value ? { ...memorandum, recalled: true } : memorandum;
			});
		});
		
		setInput("");
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
						<Button color="success" onClick={() => setIsTesting(true)}>Start</Button>
					)}
					<ul className="auto-grid">
						{memoranda.map(({ memorandum, recalled }, idx) => <li key={idx}>{recalled ? memorandum : "\u00A0"}</li>)}
					</ul>
				</div>
			) : <Spinner />}
		</section>
	);
}

export default Quiz;
