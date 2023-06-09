import { Accordion, Card } from 'react-bootstrap';
import { MenuData } from './MenuData';

interface MenuProps {
  menu: MenuData;
}

function Menu({ menu }: MenuProps) {
  return (
        <Accordion>
        {menu.meals.length > 0 ? (
            <Accordion.Item eventKey={menu.id.toString()}>
                <Accordion.Header>{menu.title}</Accordion.Header>
                <Accordion.Body>
                {menu.meals.map((meal) => (
                <div key={meal.id}>
                    <h4>{meal.title}: {meal.quantity} items</h4>
                    <span>{meal.description}</span>
                </div>
                ))}
                </Accordion.Body>
            </Accordion.Item>
        ) : (
            <Card>
                <Card.Body>{menu.title}</Card.Body>
            </Card>
        )}
        </Accordion>
  );
}

export default Menu;
