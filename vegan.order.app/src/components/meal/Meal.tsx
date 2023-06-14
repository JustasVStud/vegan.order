import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { MealData } from '../menu/MenuData';
import { deleteMeal } from './meals.service';
import { AuthContext } from '../auth/AuthContext';
interface MealProps {
    meal: MealData;
    mealId: number;
    menuId: number;
    onDelete: () => void; // New callback prop
  }
  
  function Meal({ meal, menuId, mealId, onDelete }: MealProps) {
    const authContext = useContext(AuthContext);
    const isAdmin = authContext.hasRole('ADMIN');

    const handleMealDelete = async () => {
      try {
        await deleteMeal(menuId, mealId);
        onDelete();
      } catch (error) {
        console.log(error);
      }
    };

    return ( 
        <Card>
            <Card.Title>
                {meal.title}
            </Card.Title>
            <Card.Body>
                <Row>
                    <Col>{meal.description}</Col>
                    <Col>{meal.quantity}</Col>
                    {isAdmin &&
                    <>
                    <Col><Link to={`/menus/${menuId}/meals/${mealId}`}>Edit meal</Link></Col>
                    <Col><Button onClick={handleMealDelete}>Delete meal</Button></Col>
                    </>
                    }
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Meal;