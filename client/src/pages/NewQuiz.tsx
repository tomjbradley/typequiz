import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Alert, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from "reactstrap";

const NewQuiz = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [memoranda, setMemoranda] = useState([""])

	const [isErr, setIsErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const token = localStorage.getItem("token");

		const res = await fetch("https://typequiz.onrender.com/quizzes", {
			method: "POST",
			headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
			body: JSON.stringify({ name, description, memoranda })
		});

		if (res.ok) navigate("/");
		else {
			const data = await res.json();

			setErrMsg(data.message);
			setIsErr(true);
		}
	}

	const removeMemo = (index: number) => {
		setMemoranda((prev) => {
			return prev.filter((_, i) => i !== index);
		});
	}

	const updateMemo = (index: number, input: string) => {
		setMemoranda((prev) => {
			return prev.map((memo, i) => i === index ? input : memo);
		});
	}

	return (
		<section>
			<h1>New Quiz</h1>
			<Alert color="danger" isOpen={isErr} toggle={() => setIsErr(false)}>{errMsg}</Alert>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="name">Name</Label>
					<Input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" />
				</FormGroup>
				<FormGroup>
					<Label for="description">Description</Label>
					<Input value={description} onChange={(e) => setDescription(e.target.value)} id="description" type="textarea" />
				</FormGroup>
				<FormGroup>
					<Label for="memoranda">Memoranda</Label>
					<ListGroup>
						{memoranda.map((memo, index) => (
							<ListGroupItem key={index}>
								<div className="d-flex gap-2">
									<Input value={memo} type="text" onChange={(e) => updateMemo(index, e.target.value)} />
									<Button color="danger" size="sm" onClick={() => removeMemo(index)}>Remove</Button>
								</div>
							</ListGroupItem>
						))}
					</ListGroup>
					<Button size="sm" className="mt-1" onClick={() => setMemoranda((prev) => [...prev, ""])}>Add Memo</Button>
				</FormGroup>
				<Button color="primary">Create Quiz</Button>
			</Form>
		</section>
	);
}

export default NewQuiz;
