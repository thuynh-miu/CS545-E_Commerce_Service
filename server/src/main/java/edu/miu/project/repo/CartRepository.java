package edu.miu.project.repo;

import edu.miu.project.entity.Cart;
import edu.miu.project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Object> findByBuyer_Id(Long buyerId);
    Optional<Product> findByItems_Product_Id(Long productId);
}
