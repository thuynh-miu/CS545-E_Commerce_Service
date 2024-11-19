package edu.miu.project.repo;

import edu.miu.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
