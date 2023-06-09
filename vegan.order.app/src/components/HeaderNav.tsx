import { Container, Navbar, Nav } from 'react-bootstrap';
function HeaderNav() {
    return ( 
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Vegan Order</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/menus">Menus</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
     );
}

export default HeaderNav;