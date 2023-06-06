package lt.techin.vegan.order.server.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.vegan.order.server.dto.MealDto;
import lt.techin.vegan.order.server.exception.NoEntries;
import lt.techin.vegan.order.server.exception.NotFound;
import lt.techin.vegan.order.server.model.Meal;
import lt.techin.vegan.order.server.repository.MealRepository;

@Service
public class MealService {
	
	@Autowired
	private MealRepository mealRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<MealDto> getMeals(){
		List<Meal> meals = mealRepository.findAll();
		if(meals.isEmpty()) {
			throw new NoEntries("meals");
		}
		return meals.stream().map(meal -> modelMapper.map(meal, MealDto.class)).toList();
	}
	
	public MealDto getMealById(Long id) {
		Meal meal = mealRepository.findById(id).orElseThrow(() -> new NotFound("meal", "id", id.toString()));
		return modelMapper.map(meal, MealDto.class);
	}
	
	public void createMeal(MealDto mealDto) {
		Meal meal = modelMapper.map(mealDto, Meal.class);
		mealRepository.save(meal);
	}
	
	public void updateMeal(Long id, MealDto updatedMealDto) {
		Meal existingMeal = mealRepository.findById(id).orElseThrow(() -> new NotFound("meal", "id", id.toString()));
		modelMapper.map(updatedMealDto, existingMeal);
		mealRepository.save(existingMeal);
	}
	
	public void deleteMeal(Long id) {
		mealRepository.deleteById(id);
	}
	
}
