package lt.techin.vegan.order.server.dto;

import java.util.List;

import lombok.Data;

@Data
public class MenuDto {
	private Long id;
	private String title;
	private List<MealDto> meals;
}
