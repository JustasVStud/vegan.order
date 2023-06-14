
import { Link, useParams } from 'react-router-dom';
import { MealData, MenuData } from './MenuData';
import { useState, useEffect, useContext } from 'react';
import { getMenu } from './menu.service';
import { getMeals } from '../meal/meals.service';
import { Button, Container, Row, Spinner } from 'react-bootstrap';
import Meal from '../meal/Meal';
import { AuthContext } from '../auth/AuthContext';


function Menu() {
    const authContext = useContext(AuthContext);
    const isAdmin = authContext.hasRole('ADMIN');
    const [menu, setMenu] = useState<MenuData>();
    const [isLoading, setIsLoading] = useState(true);
    const [meals, setMeals] = useState<MealData[]>([]);
    let { id } = useParams();


  const fetchMenu = async (id: string) => {
    try {
      setIsLoading(true);
      const menu = await getMenu(id);
      setMenu(menu);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMeals = async (id: string) => {
    try {
      setIsLoading(true);
      const meals = await getMeals(id);
      setMeals(meals);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchMenu(id);
      fetchMeals(id);
    }
  }, [id]);

  const handleMealDelete = () => {
    if (id !== undefined) fetchMeals(id); // Call the menu fetch again after meal deletion
  };

  return (
      <Container>
        {isLoading ? (
          <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        ) : (
           menu ? (
            <>
              <Row>
                <h2>
                  {menu.title}
                </h2>
              </Row>
              <Row>
              {meals.length > 0 ? (
              meals.map((meal) => (
                <Meal meal={meal} menuId={menu.id} mealId={meal.id} key={meal.id} onDelete={handleMealDelete}  />
              ))
              ):(<></>)}
              </Row>
              {isAdmin && 
              <Row>
                <Button variant='warning'>
                  <Link to={`/menus/${menu.id}/edit`}>Edit Menu</Link>
                </Button>
                <Button variant='success'>
                  <Link to={`/menus/${menu.id}/meals/create`}>Add meal</Link>
                </Button>
              </Row>
              }
            </>
            ) : (
            <Row>not found</Row>
          )
        )}
      </Container>
  );
}

export default Menu;
