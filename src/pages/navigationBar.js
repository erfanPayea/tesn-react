import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "./navigationBar_styles.css"
import {Link, Outlet } from "react-router-dom";

function NavigationBar() {
    return (
        <>
            <Navbar className="navbar-custom" data-bs-theme="dark" fixed="top" expand="lg">
                <Container>
                    <Navbar.Brand href="/">TESN</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/account"}>Account</Nav.Link>
                        <Nav.Link as={Link} to={"/cities"}>Cities</Nav.Link>
                        <Nav.Link as={Link} to={"/pricing"}>Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    );
}

export default NavigationBar;