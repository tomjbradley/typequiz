import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Spinner, Card, CardBody, CardTitle, CardText, ButtonGroup, Button } from "reactstrap";

import { useAuth } from "../AuthContext.tsx";
import type { Quiz } from "../types/quiz.ts";

const Home = () => {
	const { user } = useAuth();

	const [quizzes, setQuizzes] = useState<Quiz[]>([]);

	useEffect(() => {
		(async () => {
			const res = await fetch("https://typequiz.onrender.com/quizzes");
			const data = await res.json();

			setQuizzes(data);
		})();
	}, []);

	const deleteQuiz = async (quizId) => {
		await fetch(`https://typequiz.onrender.com/quizzes/${quizId}`);

		setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
	}

	return (
		<div className="stack">
			<h1>Explore</h1>
			<section>
				<h2>Quizzes</h2>
				{quizzes.length > 0 ? (
					<div className="auto-grid-lg">
						{quizzes.map((quiz) => (
							<Card key={quiz._id}>
								<CardBody>
									<CardTitle tag="h3">{quiz.name}</CardTitle>
									<CardText>{quiz.description}</CardText>
									<ButtonGroup>
										<Button color="primary" tag={Link} to={`/quizzes/${quiz._id}`}>Test Yourself</Button>
										{user && quiz.userId === user._id && <Button color="danger" onClick={() => deleteQuiz(quiz._id)}>Delete Quiz</Button>}
									</ButtonGroup>
								</CardBody>
							</Card>
						))}
					</div>
				) : <Spinner />}
			</section>
		</div>
	);
}

export default Home;
