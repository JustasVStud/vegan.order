package lt.techin.vegan.order.server.model;

import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "meals")
public class Meal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "title")
	private String title;
	@Column(name = "description")
	private String description;
	@Column(name = "quantity")
	private int quantity;
	@ManyToMany(mappedBy = "meals")
	private Set<Menu> menus;
	
	public Meal() {
		super();
	}
	
	public Meal( String title, String description, int quantity, Set<Menu> menus) {
		super();
		this.title = title;
		this.description = description;
		this.quantity = quantity;
		this.menus = menus;
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
	
	public Set<Menu> getMenus() {
		return menus;
	}

	public void setMenus(Set<Menu> menus) {
		this.menus = menus;
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, id, menus, quantity, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Meal other = (Meal) obj;
		return Objects.equals(description, other.description) && Objects.equals(id, other.id)
				&& Objects.equals(menus, other.menus) && quantity == other.quantity
				&& Objects.equals(title, other.title);
	}

	@Override
	public String toString() {
		return "Meal [id=" + id + ", title=" + title + ", description=" + description + ", quantity=" + quantity
				+ ", menus=" + menus + "]";
	}

	
	
}
