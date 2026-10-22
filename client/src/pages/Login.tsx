import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

import { useAuth } from "../AuthContext.tsx";

const Login = () => {
	const { setUser } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isErr, setIsErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await fetch(`${import.meta.env.VITE_API_URL}/tokens`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password })
		});
		const data = await res.json();

		if (res.ok) {
			localStorage.setItem("token", data.token);

			const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, { headers: { "Authorization": `Bearer ${data.token}` } });
			const user = await res.json();

			setUser(user);

			navigate("/");
		} else {
			setErrMsg(data.message);
			setIsErr(true);
		}
	}

	return (
		<section>
			<h1>Login</h1>
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
				<Button color="primary">Login</Button>
			</Form>
		</section>
	);
}

export default Login;
