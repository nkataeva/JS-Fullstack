--создание таблиц
CREATE TABLE products (
	id_pr bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name_pr text NOT NULL,
	price_pr int NOT NULL,
	count_pr int NOT NULL
);
CREATE TABLE clients (
	id_cl bigint NOT NULL PRIMARY KEY,
	name_cl text NOT NULL,
	surname_cl text NOT NULL,
	phone_cl VARCHAR(10) NOT NULL
);
CREATE TABLE orders (
	id_ord bigint NOT NULL PRIMARY KEY,
	product bigint NOT NULL,
	amount int NOT NULL,
	client bigint NOT NULL,
	FOREIGN KEY (product) REFERENCES products(id_pr),
	FOREIGN KEY (client) REFERENCES clients(id_cl)
);

--некоторые правочки
ALTER TABLE clients ALTER COLUMN phone_cl TYPE varchar(11);
ALTER TABLE clients ALTER COLUMN id_cl ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE products ALTER COLUMN id_pr ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE orders ALTER COLUMN id_ord ADD GENERATED ALWAYS AS IDENTITY;


--смотрим, что получилось
select * from products;
select * from clients;
select * from orders;

--заполняем тестовыми данными таблицы
INSERT INTO products(name_pr, price_pr, count_pr) 
	VALUES ('Стул', 1500, 5), ('Шкаф', 12000, 3), ('Зеркало', 4300, 7);
INSERT INTO clients(name_cl, surname_cl, phone_cl)
	VALUES ('Дарья', 'Титова', 89275938211), ('Павел', 'Смирнов', 89234856442);
INSERT INTO clients(name_cl, surname_cl, phone_cl) 
	VALUES ('Максим', 'Андреев', 89234567651);

-- добавим заказ в таблицу с корректными id 
INSERT INTO orders(product, amount, client)
	VALUES (2, 1, 2);
INSERT INTO orders(product, amount, client)
	VALUES (3, 5, 4);
	
--попробуем добавить в заказы id несуществющего заказа - ошибка
INSERT INTO orders(product, amount, client)
	VALUES (6, 1, 3);
	
-- вывод таблиц
SELECT * FROM orders JOIN clients ON orders.client=clients.id_cl;
SELECT * FROM orders JOIN products ON orders.product=products.id_pr;

-- нужно ли контролировать логику с заказами и оставшемся количеством товаров в магазине? 
-- если да, то как?



