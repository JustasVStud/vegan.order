import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { getMenus } from './menu.service';
import Menu  from './Menu';
import { MenuData } from './MenuData';

function MenuList() {
  const [menus, setMenus] = useState<MenuData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsLoading(true);
        const menus = await getMenus();
        setMenus(menus);
        console.log(menus);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, []);

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
                <Menu key={menu.id} menu={menu} />
              ))
            ) : (
              <h4>No Menus were found</h4>
            )
        )}
         
      </Row>
    </Container>
  );
}

export default MenuList;
