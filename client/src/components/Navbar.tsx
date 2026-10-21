import { useState } from "react";
import { Link } from "react-router";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";

import { useAuth } from "../AuthContext.tsx";

const MyNavbar = () => {
	const { user, setUser } = useAuth();

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	}

	return (
		<Navbar expand="md" color="primary" dark>
			<NavbarBrand tag={Link} to="/">TypeQuiz</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="ms-auto" navbar>
					<NavItem>
						<NavLink tag={Link} to="/">Explore</NavLink>
					</NavItem>
					{user ? (
						<>
							<NavItem>
								<NavLink tag={Link} to="/quizzes/new">Create Quiz</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#" onClick={logout}>Logout</NavLink>
							</NavItem>
						</>
					) : (
						<>
							<NavItem>
								<NavLink tag={Link} to="/login">Login</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag="button" to="/register">Register</NavLink>
							</NavItem>
						</>
					)}
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default MyNavbar;
