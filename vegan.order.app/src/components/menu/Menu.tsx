
import { useParams } from 'react-router-dom';
import { MealData, MenuData } from './MenuData';
import { useState, useEffect, useContext } from 'react';
import { getMenu } from './menu.service';
import { getMeals } from '../meal/meals.service';
import { Container, Row, Spinner } from 'react-bootstrap';
import Meal from '../meal/Meal';
import { AuthContext } from '../auth/AuthContext';


function Menu() {
    const authContext = useContext(AuthContext);
    const isAdmin = authContext.hasRole('ADMIN');
    const [menu, setMenu] = useState<MenuData>();
    const [isLoading, setIsLoading] = useState(true);
    const [meals, setMeals] = useState<MealData[]>([]);
    let { id } = useParams();
    useEffect(() => {
      const fetchMenu = async (id : string) => {
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
      if(id !== undefined){
        fetchMenu(id);
      }
    }, [id]);

    useEffect(() => {
      const fetchMeals = async(id: string) => {
        try{
            setIsLoading(true);
            const meals = await getMeals(id);
            setMeals(meals);
        } catch (error) {
          console.log(error);
        } finally{
          setIsLoading(false);
        } 
      }
      if(id !== undefined){
        fetchMeals(id);
      }
    }, [id])
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
                <Meal meal={meal} key={meal.id} />
              ))
              ):(<></>)}
              </Row>
            </>
            ) : (
            <Row>not found</Row>
          )
        )}
      </Container>
  );
}

export default Menu;
