import { useState, useEffect } from "react";

function App() {
	const [quizzes, setQuizzes] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch("https://typequiz.onrender.com/quizzes");
			const data = await res.json();

			setQuizzes(data);
		})();
	}, []);

	return (
		<>
			{quizzes.forEach((quiz) => quiz.name)}
		</>
	)
}

export default App
