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


-- Insert Attributes
INSERT INTO Attribute (name, value) VALUES ('color', 'Black');
INSERT INTO Attribute (name, value) VALUES ('color', 'Red');
INSERT INTO Attribute (name, value) VALUES ('color', 'White');
INSERT INTO Attribute (name, value) VALUES ('color', 'Blue');
INSERT INTO Attribute (name, value) VALUES ('color', 'Green');
INSERT INTO Attribute (name, value) VALUES ('color', 'Gold');
INSERT INTO Attribute (name, value) VALUES ('color', 'Silver');
INSERT INTO Attribute (name, value) VALUES ('color', 'Space Gray');
INSERT INTO Attribute (name, value) VALUES ('color', 'Purple');

INSERT INTO Attribute (name, value) VALUES ('branch', 'Apple');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Samsung');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Huawei');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Xiaomi');
INSERT INTO Attribute (name, value) VALUES ('branch', 'OnePlus');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Sony');
INSERT INTO Attribute (name, value) VALUES ('branch', 'LG');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Google');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Nokia');
INSERT INTO Attribute (name, value) VALUES ('branch', 'AT&T');
INSERT INTO Attribute (name, value) VALUES ('branch', 'Verizon');
INSERT INTO Attribute (name, value) VALUES ('branch', 'T-Mobile');

-- Insert Products
INSERT INTO Product (name, description, price, quantity, image_url, seller_id)
VALUES ('iPhone 16 Pro Max 256GB Desert Titanium. Apple Intelligence', 'iPhone 16 Pro Max. Built for Apple Intelligence. 1 Featuring a stunning titanium design. Camera Control. 4K 120 fps Dolby Vision. And A18 Pro chip.', 999.99, 10, 'https://i5.walmartimages.com/seo/Verizon-iPhone-16-Pro-Max-256GB-Desert-Titanium-Apple-Intelligence_2a3b7743-c254-4ea6-807e-173340f9184b.24f9f58f9c3d33fa07c0d1921bca65a1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', 1);

INSERT INTO Product_Attributes (products_id, attributes_id)
VALUES (1, (SELECT id FROM Attribute WHERE name = 'branch' AND value = 'Apple'));
INSERT INTO Product_Attributes (products_id, attributes_id)
VALUES (1, (SELECT id FROM Attribute WHERE name = 'color' AND value = 'Silver'));

INSERT INTO Product_Attributes (products_id, attributes_id)
VALUES (1, (SELECT id FROM Attribute WHERE name = 'branch' AND value = 'Apple'));
INSERT INTO Product_Attributes (products_id, attributes_id)
VALUES (1, (SELECT id FROM Attribute WHERE name = 'color' AND value = 'Gold'));
