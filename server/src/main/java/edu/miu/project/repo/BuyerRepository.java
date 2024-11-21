package edu.miu.project.repo;

import edu.miu.project.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    @Query("SELECT b FROM Buyer b WHERE b.user.email = :email")
    Optional<Buyer> findByEmail(String email);
}
