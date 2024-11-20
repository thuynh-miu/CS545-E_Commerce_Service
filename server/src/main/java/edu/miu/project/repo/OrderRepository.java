package edu.miu.project.repo;

import edu.miu.project.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer_Id(Long buyerId);
}
