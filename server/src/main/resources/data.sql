-- -- Data for Role table
INSERT INTO Role (role)
VALUES ('ADMIN'),
       ('SELLER'),
       ('BUYER');
--
-- -- Insert Users
INSERT INTO users (username, email, password, role_id)
VALUES ('admin', 'admin@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 1),
       ('seller', 'seller@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 2),
       ('buyer','buyer@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 3);

-- Insert Sellers
INSERT INTO seller (user_id, is_approved)
VALUES (2, false);

-- Insert Buyers
INSERT INTO buyer (user_id)
VALUES (3);


-- Insert Products
-- INSERT INTO product (name, description, price, seller_id)
-- VALUES ('Laptop', 'High-performance laptop', 1200.00, 2),
--        ('Headphones', 'Noise-canceling headphones', 150.00, 2),
--        ('Smartphone', 'Latest model smartphone', 800.00, 2);

-- Insert Orders
-- INSERT INTO orders (buyer_id, product_id, quantity, order_date)
-- VALUES (3, 1, 1, '2024-11-01T10:00:00'),
--        (3, 2, 2, '2024-11-02T12:30:00');

-- Insert Reviews
-- INSERT INTO review (buyer_id, product_id, comment, rating)
-- VALUES (3, 1, 'Excellent laptop, works perfectly!', 5),
--        (3, 2, 'Good headphones but could be more comfortable.', 4);
