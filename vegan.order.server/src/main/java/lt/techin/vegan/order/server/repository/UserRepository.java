package lt.techin.vegan.order.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.vegan.order.server.model.User;

public interface UserRepository extends JpaRepository <User, Long>{
	
	Optional<User> findByUsername(String username);
}
