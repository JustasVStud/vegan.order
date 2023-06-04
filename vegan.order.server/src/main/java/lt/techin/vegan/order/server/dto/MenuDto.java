package lt.techin.vegan.order.server.dto;

import java.util.Objects;
import java.util.Set;

public class MenuDto {
	
	private Long id;
	private String title;
	private Set<Long> mealsIds;
	
	public MenuDto() {
		super();
	}
	public MenuDto(Long id, String title, Set<Long> mealsIds) {
		super();
		this.id = id;
		this.title = title;
		this.mealsIds = mealsIds;
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
	public Set<Long> getMeals() {
		return mealsIds;
	}
	public void setMeals(Set<Long> mealsIds) {
		this.mealsIds = mealsIds;
	}
	@Override
	public int hashCode() {
		return Objects.hash(id, mealsIds, title);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MenuDto other = (MenuDto) obj;
		return Objects.equals(id, other.id) && Objects.equals(mealsIds, other.mealsIds) && Objects.equals(title, other.title);
	}
	@Override
	public String toString() {
		return "MenuDto [id=" + id + ", title=" + title + ", mealsIds=" + mealsIds + "]";
	}
	
	
}
