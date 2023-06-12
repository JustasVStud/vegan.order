import { Container, Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
function HeaderNav() {
    const authContext = useContext(AuthContext);
    //const isAdmin = authContext.hasRole('ADMIN');
    
    return ( 
        <Navbar>
            <Container>
                <Navbar.Brand>Vegan Order</Navbar.Brand>
                <Nav>
                {!authContext.user ? (
                    <>
                    <Nav.Link href='/login'>Login</Nav.Link>
                    <Nav.Link href='/register'>Register</Nav.Link>
                    </>
                ) : (
                    <Nav.Link href="/menus">Menus</Nav.Link>
                )}
                </Nav>
            </Container>
        </Navbar>
     );
}

export default HeaderNav;