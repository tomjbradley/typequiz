import { useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";

const MyNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar expand="md" color="primary" dark>
			<NavbarBrand href="/">TypeQuiz</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="ms-auto" navbar>
					<NavItem>
						<NavLink href="/sign-in">Sign in</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/register">Register</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default MyNavbar;
