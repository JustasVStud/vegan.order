package lt.techin.vegan.order.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.vegan.order.server.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

}
