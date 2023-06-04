package lt.techin.vegan.order.server.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lt.techin.vegan.order.server.dto.MealDto;
import lt.techin.vegan.order.server.model.Meal;

@Component
public class MealMapper {
	   
		private final ModelMapper modelMapper;

	    public MealMapper() {
	        this.modelMapper = new ModelMapper();
	    }

	    public MealDto toDto(Meal meal) {
	        return modelMapper.map(meal, MealDto.class);
	    }

	    public Meal toEntity(MealDto mealDto) {
	        return modelMapper.map(mealDto, Meal.class);
	    }

	    public void updateMealFromDto(MealDto mealDto, Meal meal) {
	        modelMapper.map(mealDto, meal);
	    }
}
