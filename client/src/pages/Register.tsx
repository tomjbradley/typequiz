import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

const Register = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isErr, setIsErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("https://typequiz.onrender.com/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password })
		});

		if (res.ok) navigate("/login");
		else {
			const data = await res.json();

			setErrMsg(data.message);
			setIsErr(true);
		}
	}

	return (
		<section>
			<h1>Register</h1>
			<Alert color="danger" isOpen={isErr} toggle={() => setIsErr(false)}>{errMsg}</Alert>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
				</FormGroup>
				<Button color="primary">Register</Button>
			</Form>
		</section>
	);
}

export default Register;
