package edu.miu.project.repo;

import edu.miu.project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySeller_Id(Long sellerId);
}
