package lt.techin.vegan.order.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.vegan.order.server.dto.MealDto;
import lt.techin.vegan.order.server.exception.NoEntries;
import lt.techin.vegan.order.server.exception.NotFound;
import lt.techin.vegan.order.server.mapper.MealMapper;
import lt.techin.vegan.order.server.model.Meal;
import lt.techin.vegan.order.server.repository.MealRepository;

@Service
public class MealService {
	@Autowired
	private MealRepository mealRepository;
	
	@Autowired
	private  MealMapper mealMapper;
	
	public List<MealDto>getMeals() {
		List<Meal> meals = mealRepository.findAll();
		if (meals.isEmpty()) {
			throw new NoEntries("meals");
		}
		return meals.stream().map(mealMapper::toDto).toList();
	}
	
	public MealDto getMealById(Long id) {
		Meal meal = mealRepository.findById(id).orElseThrow(() -> new NotFound("meal", "id", id.toString()));
		return mealMapper.toDto(meal);
	}
	
	public void createMeal(MealDto mealDto) {
		mealRepository.save(mealMapper.toEntity(mealDto));
	}
	
	public void updateMeal(Long id, MealDto updatedMealDto) {
		MealDto currentMealDto = getMealById(id);
		currentMealDto.setTitle(updatedMealDto.getTitle());
		currentMealDto.setDescription(updatedMealDto.getDescription());
		currentMealDto.setMenuIds(updatedMealDto.getMenuIds());
		mealRepository.save(mealMapper.toEntity(currentMealDto));
	}
	
	public void deleteMeal(Long id) {
		mealRepository.deleteById(id);
	}
}
