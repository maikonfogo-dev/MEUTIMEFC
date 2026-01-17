-- TIMES
CREATE TABLE teams (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- USUÁRIOS
CREATE TABLE users (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  name VARCHAR(100),
  email VARCHAR(100),
  is_socio BOOLEAN DEFAULT FALSE
);

-- PRODUTOS
CREATE TABLE products (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  name VARCHAR(100),
  price DECIMAL(10,2),
  active BOOLEAN DEFAULT TRUE
);

-- ESTOQUE POR TAMANHO
CREATE TABLE product_stock (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  size VARCHAR(5),
  quantity INT
);

-- PEDIDOS
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  team_id UUID REFERENCES teams(id),
  total DECIMAL(10,2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- PAGAMENTOS
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  method VARCHAR(20),
  pix_code TEXT,
  status VARCHAR(20)
);
