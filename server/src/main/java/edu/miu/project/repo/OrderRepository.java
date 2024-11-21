package edu.miu.project.repo;

import edu.miu.project.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByBuyer_Id(Long buyerId, Pageable pageable);
}
