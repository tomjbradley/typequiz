import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { Container } from "reactstrap";

// Components
import Navbar from "./components/Navbar.tsx";

// Pages
import Home from "./pages/Home.tsx";
import Quiz from "./pages/Quiz.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

function App() {
	useEffect(() => {
		(async () => {
			const token = localStorage.getItem("token");

			if (!token) return;

			const res = await fetch("https://typequiz.onrender.com/users/me", { headers: { "Authorization": `Bearer ${token}` } });
			const data = await res.json();

			if (res.ok) {
				
			} else {
				localStorage.removeItem("token");
			}
		})();
	}, []);

	return (
		<>
			<Navbar />
			<Container className="mt-2 mt-md-4">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/quizzes/:quizId" element={<Quiz />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
