import { Routes, Route } from "react-router";
import { Container } from "reactstrap";

// Components
import Navbar from "./components/Navbar.tsx";

// Pages
import Home from "./pages/Home.tsx";

function App() {
	return (
		<>
			<Navbar />
			<Container className="mt-2 mt-md-4">
				<Routes>
					<Route index element={<Home />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
