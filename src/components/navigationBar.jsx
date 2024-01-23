import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles.css"

function NavigationBar() {
    return (
        <>
            <Navbar data-bs-theme="dark" fixed="top" expand="lg" style={{backgroundColor:"#cb8113"}}>
                <Container>
                    <Navbar.Brand href="#home">TESN</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Account</Nav.Link>
                        <Nav.Link href="#cities">Cities</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;