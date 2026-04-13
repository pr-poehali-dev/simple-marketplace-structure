CREATE TABLE t_p36273088_simple_marketplace_s.users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  city VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p36273088_simple_marketplace_s.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p36273088_simple_marketplace_s.users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE t_p36273088_simple_marketplace_s.orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES t_p36273088_simple_marketplace_s.users(id),
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  city VARCHAR(255),
  address TEXT,
  delivery_method VARCHAR(50),
  payment_method VARCHAR(50),
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
