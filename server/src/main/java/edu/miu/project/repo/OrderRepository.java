package edu.miu.project.repo;

import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByBuyer_Id(Long buyerId, Pageable pageable);
    Page<Order> findBySeller_Id(Long sellerId, Pageable pageable);

    Page<Order> findByBuyer_IdAndStatus(Long buyer_id, OrderStatus status, Pageable pageable);
    Page<Order> findBySeller_IdAndStatus(Long seller_id, OrderStatus status, Pageable pageable);
}
