package lt.techin.vegan.order.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.vegan.order.server.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
