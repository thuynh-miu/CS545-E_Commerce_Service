package edu.miu.project.repo;

import edu.miu.project.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT s FROM Seller s WHERE s.user.email = :email")
    Optional<Seller> findByEmail(String email);
}
