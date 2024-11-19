-- Insert Users
INSERT INTO users (id, username, email, password, is_approved)
VALUES (1, 'admin', 'admin@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', true),
       (2, 'seller', 'seller@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', true),
       (3, 'buyer','buyer@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', true);

-- Insert Products
INSERT INTO product (id, name, description, price, seller_id, is_approved)
VALUES (1, 'Laptop', 'High-performance laptop', 1200.00, 2, true),
       (2, 'Headphones', 'Noise-canceling headphones', 150.00, 2, true),
       (3, 'Smartphone', 'Latest model smartphone', 800.00, 2, false);
-- Not approved yet

-- Insert Orders
INSERT INTO orders (id, buyer_id, product_id, quantity, order_date)
VALUES (1, 3, 1, 1, '2024-11-01T10:00:00'),
       (2, 3, 2, 2, '2024-11-02T12:30:00');

-- Insert Reviews
INSERT INTO review (id, buyer_id, product_id, comment, rating)
VALUES (1, 3, 1, 'Excellent laptop, works perfectly!', 5),
       (2, 3, 2, 'Good headphones but could be more comfortable.', 4);

-- Data for Role table
INSERT INTO Role (role)
VALUES ('ADMIN'),
       ('SELLER'),
       ('BUYER');

-- Data for the join table between Users and Role
-- Assuming the join table is named user_roles
INSERT INTO users_roles (user_id, roles_id)
VALUES (1, 1), -- ADMIN
       (2, 2), -- SELLER
       (3, 3); -- BUYER