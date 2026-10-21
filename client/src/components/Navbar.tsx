import { useState } from "react";
import { Link } from "react-router";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";

const MyNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar expand="md" color="primary" dark>
			<NavbarBrand tag={Link} to="/">TypeQuiz</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="ms-auto" navbar>
					<NavItem>
						<NavLink tag={Link} to="/">Explore</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/login">Login</NavLink>
					</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/register">Register</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default MyNavbar;
