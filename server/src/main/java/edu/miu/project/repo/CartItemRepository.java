package edu.miu.project.repo;

import edu.miu.project.entity.Cart;
import edu.miu.project.entity.CartItem;
import edu.miu.project.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

//    @Transactional
//    @Modifying
//    @Query("delete from CartItem ci where ci.product.id = :productId")
//    void deleteByProductId(Long productId);
}
