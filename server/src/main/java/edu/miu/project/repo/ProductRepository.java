package edu.miu.project.repo;

import edu.miu.project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySeller_Id(Long sellerId);

    @Query("SELECT p FROM Product p JOIN OrderItem oi ON p.id = oi.product.id GROUP BY p.id ORDER BY COUNT(oi.id) DESC")
    List<Product> findTop10OrderProduct();

    @Query("SELECT p FROM Product p ORDER BY p.name ASC")
    List<Product> find10ProductByNameDesc();

}
