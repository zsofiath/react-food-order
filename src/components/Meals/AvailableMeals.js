import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch('https://react-practice-333ee-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key, 
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setmeals(loadedMeals)
    }
    fetchMeal();
  }, [])
  
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
