package lt.techin.vegan.order.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.vegan.order.server.model.Meal;

public interface MealRepository extends JpaRepository<Meal, Long> {
	
	Optional<Meal> findByTitle(String title);
}
