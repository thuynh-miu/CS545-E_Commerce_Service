package edu.miu.project.entity.dto;

import edu.miu.project.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String userName;
    private String email;
    private String password;
    private String role;
}
