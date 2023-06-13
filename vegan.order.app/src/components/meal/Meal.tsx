import { Card, Row, Col } from 'react-bootstrap';
import { MealData } from '../menu/MenuData';
import { Link, useParams } from 'react-router-dom';

interface MealProps {
    meal: MealData;
}
function Meal({meal} : MealProps) {
    const { menuId } = useParams()
    return ( 
        <Card>
            <Card.Title>
                {meal.title}
            </Card.Title>
            <Card.Body>
                <Row>
                    <Col>{meal.description}</Col>
                    <Col>{meal.quantity}</Col>
                    <Col><Link to={`menus/${menuId}/meals/create`}></Link></Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Meal;