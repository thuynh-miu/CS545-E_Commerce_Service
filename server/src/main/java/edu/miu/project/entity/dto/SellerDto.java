package edu.miu.project.entity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.miu.project.entity.Role;
import lombok.Data;

@Data
public class SellerDto {
    private Long id;
    private UserDto user;
    @JsonProperty("isApproved")
    private boolean isApproved;
}
