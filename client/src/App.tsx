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
import NewQuiz from "./pages/NewQuiz.tsx";

function App() {
	return (
		<>
			<Navbar />
			<Container className="mt-2 mt-md-4 mb-5">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/quizzes/:quizId" element={<Quiz />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/quizzes/new" element={<NewQuiz />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
