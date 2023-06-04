package lt.techin.vegan.order.server.model;

import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "menus")
public class Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "title")
	private String title;
	@ManyToMany
	@JoinTable(
			name = "menu_meal",
			joinColumns = @JoinColumn(name = "menu_id"),
			inverseJoinColumns = @JoinColumn(name = "meal_id")
			)
	private Set<Meal> meals;
	
	public Menu() {
		super();
	}

	public Menu( String title, Set<Meal> meals) {
		super();
		this.title = title;
		this.meals = meals;
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

	public Set<Meal> getMeals() {
		return meals;
	}

	public void setMeals(Set<Meal> meals) {
		this.meals = meals;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, meals, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Menu other = (Menu) obj;
		return Objects.equals(id, other.id) && Objects.equals(meals, other.meals) && Objects.equals(title, other.title);
	}

	@Override
	public String toString() {
		return "Menu [id=" + id + ", title=" + title + ", meals=" + meals + "]";
	}
	
	
}
