import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Container, Row, Spinner } from 'react-bootstrap';
import { getMenus } from './menu.service';
import { MenuData } from './MenuData';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { deleteMenu } from './menu.service';

function MenuList() {
  const [menus, setMenus] = useState<MenuData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const isAdmin = authContext.hasRole('ADMIN');

  const fetchMenus = async () => {
    try {
      setIsLoading(true);
      const menus = await getMenus();
      setMenus(menus);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMenus();
  }, []);

  const handleMenuDelete = async (menuId: number) => {
    try {
      await deleteMenu(menuId);
      fetchMenus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <h2>Menus</h2>
      </Row>
      <Row>
        {isLoading? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
        ): (
            menus.length > 0 ? (
              menus.map((menu) => (
                <Card key={menu.id}>
                  <Link to={`/menus/${menu.id}`}>
                    <Card.Body>
                      <Card.Title>{menu.title}</Card.Title>
                      {isAdmin && <Button onClick={() => handleMenuDelete(menu.id)}>Delete Menu</Button>}
                    </Card.Body>
                  </Link>
                </Card>
              ))
            ) : (
              <h4>No Menus were found</h4>
            )
        )}
      </Row>
      {isAdmin && 
        <Row>
            <Button variant="sucess">
              <Link to="/menus/create">
                Create new
              </Link>
            </Button>
        </Row>
      }
    </Container>
  );
}

export default MenuList;
