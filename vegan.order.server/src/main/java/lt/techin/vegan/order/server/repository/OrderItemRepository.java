package lt.techin.vegan.order.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.vegan.order.server.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
