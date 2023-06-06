package lt.techin.vegan.order.server.dto;

import lombok.Data;

@Data
public class MealDto {
	private Long id;
	private String title;
	private String description;
	private int quantity;
}
