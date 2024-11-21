package edu.miu.project.entity.dto;

import edu.miu.project.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class RegisterRequest {
    private String userName;
    private String email;
    private String password;
    private Role role;
}
