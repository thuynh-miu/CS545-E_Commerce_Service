package edu.miu.project.repo;

import edu.miu.project.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySeller_Id(Long sellerId);

    @Query("SELECT p FROM Product p JOIN OrderItem oi ON p.id = oi.product.id GROUP BY p.id ORDER BY COUNT(oi.id) DESC")
    List<Product> findTop10OrderProduct();

    @Query("SELECT p FROM Product p ORDER BY p.name ASC")
    List<Product> find10ProductByNameDesc();

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN p.attributes a " +
            "WHERE (:minPrice is null or p.price >= :minPrice) " +
            "AND (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:maxPrice is null or p.price <= :maxPrice) " +
            "AND (" +
            "(:colors is null or (a.name = 'color' AND LOWER(a.value) IN :colors)) " +
            "OR (:brands is null or (a.name = 'brand' AND LOWER(a.value) IN :brands))" +
            ") ")
    Page<Product> filterProducts(String name, Double minPrice, Double maxPrice, List<String> colors, List<String> brands, Pageable pageable);
}
