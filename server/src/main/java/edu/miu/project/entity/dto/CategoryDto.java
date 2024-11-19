package edu.miu.project.entity.dto;

import edu.miu.project.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class CategoryDto {
    private Long id;
    private String name;
    private List<Product> products;
}
