package edu.miu.project.entity.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.miu.project.entity.Order;
import edu.miu.project.entity.OrderItem;
import edu.miu.project.entity.OrderStatus;
import edu.miu.project.entity.Product;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderItemDto {
    private Long id;
    private ProductDto product;
    private int quantity;
    private double price;
}

