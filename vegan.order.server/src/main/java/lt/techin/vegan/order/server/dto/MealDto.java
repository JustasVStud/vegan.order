package lt.techin.vegan.order.server.dto;

import java.util.Objects;
import java.util.Set;

public class MealDto {
	
	private Long id;
	private String title;
	private String description;
	private int quantity;
	private Set<Long> menuIds;
	public MealDto() {
		super();
	}
	public MealDto(Long id, String title, String description, int quantity, Set<Long> menuIds) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.quantity = quantity;
		this.menuIds = menuIds;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Set<Long> getMenuIds() {
		return menuIds;
	}
	public void setMenuIds(Set<Long> menuIds) {
		this.menuIds = menuIds;
	}
	@Override
	public int hashCode() {
		return Objects.hash(description, id, menuIds, quantity, title);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MealDto other = (MealDto) obj;
		return Objects.equals(description, other.description) && Objects.equals(id, other.id)
				&& Objects.equals(menuIds, other.menuIds) && quantity == other.quantity
				&& Objects.equals(title, other.title);
	}
	@Override
	public String toString() {
		return "MealDto [id=" + id + ", title=" + title + ", description=" + description + ", quantity=" + quantity
				+ ", menuIds=" + menuIds + "]";
	}
	
	
}
