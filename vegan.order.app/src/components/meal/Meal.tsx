import { Card, Row, Col } from 'react-bootstrap';
import { MealData } from '../menu/MenuData';

interface MealProps {
    meal: MealData;
}

function Meal({meal} : MealProps) {
    return ( 
        <Card>
            <Card.Title>
                {meal.title}
            </Card.Title>
            <Card.Body>
                <Row>
                    <Col>{meal.description}</Col>
                    <Col>{meal.quantity}</Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Meal;