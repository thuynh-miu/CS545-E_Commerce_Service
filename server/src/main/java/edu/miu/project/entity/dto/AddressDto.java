package edu.miu.project.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddressDto {
    private String street;
    private String city;
    private String state;
    private String zipCode;
}
