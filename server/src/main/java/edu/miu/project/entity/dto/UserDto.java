package edu.miu.project.entity.dto;

import edu.miu.project.entity.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private Role role;
}
