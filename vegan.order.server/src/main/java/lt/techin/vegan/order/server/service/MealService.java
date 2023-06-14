package lt.techin.vegan.order.server.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.vegan.order.server.dto.MealDto;
import lt.techin.vegan.order.server.exception.EntityMismatch;
import lt.techin.vegan.order.server.exception.NoEntries;
import lt.techin.vegan.order.server.exception.NotFound;
import lt.techin.vegan.order.server.model.Meal;
import lt.techin.vegan.order.server.model.Menu;
import lt.techin.vegan.order.server.repository.MealRepository;
import lt.techin.vegan.order.server.repository.MenuRepository;

@Service
public class MealService {
	
	@Autowired
	private MealRepository mealRepository;
	@Autowired
	private MenuRepository menuRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public List<MealDto> getMeals(Long menuId){
		List<Meal> meals = mealRepository.findAllByMenuId(menuId);
		if(meals.isEmpty()) {
			throw new NoEntries("meals");
		}
		return meals.stream().map(meal -> modelMapper.map(meal, MealDto.class)).toList();
	}
	
	public MealDto getMealById(Long menuId, Long id) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new NotFound("menu", "id", menuId.toString()));
		Meal meal = mealRepository.findById(id).orElseThrow(() -> new NotFound("meal", "id", id.toString()));
		if(!meal.getMenu().getId().equals(menu.getId())) {
			throw new EntityMismatch("meal", id.toString(), "menu", menuId.toString());
		}
		return modelMapper.map(meal, MealDto.class);
	}
	
	public void createMeal(Long menuId, MealDto mealDto) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new NotFound("menu", "id", menuId.toString()));
		Meal meal = modelMapper.map(mealDto, Meal.class);
		meal.setMenu(menu);
		mealRepository.save(meal);
	}
	
	public void updateMeal(Long menuId, Long id, MealDto updatedMealDto) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new NotFound("menu", "id", menuId.toString()));
		Meal existingMeal = mealRepository.findById(id).orElseThrow(() -> new NotFound("meal", "id", id.toString()));
		if(!existingMeal.getMenu().getId().equals(menu.getId())) {
			throw new EntityMismatch("meal", id.toString(), "menu", menuId.toString());
		}
		existingMeal.setTitle(updatedMealDto.getTitle());
		existingMeal.setDescription(updatedMealDto.getDescription());
		existingMeal.setQuantity(updatedMealDto.getQuantity());
		mealRepository.save(existingMeal);
	}
	
	public void deleteMeal(Long menuId, Long id) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new NotFound("menu", "id", menuId.toString()));
		Meal meal = mealRepository.findById(id).orElseThrow(() -> new NotFound("meal", "id", id.toString()));
		if(!meal.getMenu().getId().equals(menu.getId())) {
			throw new EntityMismatch("meal", id.toString(), "menu", menuId.toString());
		}
		mealRepository.delete(meal);
	}
	
}
