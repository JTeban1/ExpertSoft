CREATE OR REPLACE VIEW vw_all_bills AS
SELECT
    b.id_bill,
    b.bill_quarter,
    b.amount_billed,
    b.amount_paid,
    c.name AS client_name,
    t.name AS transaction_name
FROM bills b
JOIN client b ON b.id_client = c.id_client
JOIN transactions t ON b.id_transaction = t.id_transaction
