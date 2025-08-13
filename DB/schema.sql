CREATE DATABASE pd_juan_sepulveda_berneslee;

-- Table: payment_methods
CREATE TABLE IF NOT EXISTS payment_methods (
    id_payment_method SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: transaction_status
CREATE TABLE IF NOT EXISTS transaction_status (
    id_transaction_status SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL
);

-- Table: clients
CREATE TABLE IF NOT EXISTS clients (
    id_client SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    dni INT,
    address VARCHAR(120),
    phone VARCHAR(60),
    email VARCHAR(120)
);

-- Table: transactions
CREATE TABLE IF NOT EXISTS transactions (
    id_transaction SERIAL PRIMARY KEY,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_amount INT,
    transaction_type VARCHAR(50) NOT NULL,
    id_transaction_status INT REFERENCES transaction_status(id_transaction_status) ON DELETE SET NULL
);

-- Table: bills
CREATE TABLE IF NOT EXISTS bills (
    id_bill SERIAL PRIMARY KEY,
    bill_quarter DATE,
    amount_billed INT,
    amount_paid INT,
    id_client INT REFERENCES clients(id_client) ON DELETE SET NULL,
    id_transaction INT REFERENCES transactions(id_transaction) ON DELETE SET NULL,
    id_payment_method INT REFERENCES payment_methods(id_payment_method) ON DELETE SET NULL
);