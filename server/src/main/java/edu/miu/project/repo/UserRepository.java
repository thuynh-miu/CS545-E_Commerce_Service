package edu.miu.project.repo;

import edu.miu.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    @Query("SELECT s FROM Seller s JOIN s.user u JOIN u.roles r WHERE s.isApproved = false AND r.role = 'SELLER'")
    Optional<List<User>> findUnapprovedSellers();
}
