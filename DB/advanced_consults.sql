-- Total pagado por cada cliente
SELECT 
	b.id_bill,
	c.name,
	SUM(b.amount_paid) AS total_amount_paid
FROM bills b
JOIN clients c ON b.id_client = c.id_client
GROUP BY b.id_bill, c.name ORDER BY total_amount_paid DESC;

-- Facturas pendientes con información de cliente y transacción asociada
SELECT 
	b.id_bill,
	c.name,
	t.id_transaction,
	ts.name AS transaction_status
FROM bills b
JOIN clients c on b.id_client = c.id_client
JOIN transactions t ON b.id_transaction = t.id_transaction 
JOIN transaction_status ts ON t.id_transaction = ts.id_transaction_status
WHERE t.id_transaction_status = 2;

-- Listado de transacciones por plataforma
SELECT
	t.id_transaction,
	c.name,
	p.name AS payment_method_name
FROM bills b
JOIN clients c ON  b.id_client = c.id_client
JOIN transactions t ON b.id_transaction = t.id_transaction
JOIN payment_methods p ON p.id_payment_method = p.id_payment_method
WHERE p.name = 'Nequi';