import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Spinner, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

import type { Quiz } from "../types/quiz.ts";

const Home = () => {
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);

	useEffect(() => {
		(async () => {
			const res = await fetch("https://typequiz.onrender.com/quizzes");
			const data = await res.json();

			setQuizzes(data);
		})();
	}, []);

	return (
		<div className="stack">
			<h1>Explore</h1>
			<section>
				<h2>Recent Quizzes</h2>
				{quizzes.length > 0 ? quizzes.map((quiz) => (
					<Card key={quiz._id}>
						<CardBody>
							<CardTitle tag="h3">{quiz.name}</CardTitle>
							<CardText>{quiz.description}</CardText>
							<Button color="primary" tag={Link} to={`/quizzes/${quiz._id}`}>Test Yourself</Button>
						</CardBody>
					</Card>
				)) : <Spinner />}
			</section>
			<section>
				<h2>My Quizzes</h2>
			</section>
		</div>
	);
}

export default Home;
