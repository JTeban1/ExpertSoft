import pool from "../../config/db_conn.js";

/**
 * Retrieve all bills for a specific client ID.
 * @param {number|string} id_client - client ID
 */
export const findByClientId = async (id_client) => {
    const result = await pool.query('SELECT * FROM vw_all_bills WHERE id_client = $1', [id_client]);
    return result.rows;
};

/**
 * Retrieve all bills from the database view.
 * @returns {Promise<Array>} Array of bill objects
 */
export const findAll = async () => {
    const result = await pool.query('SELECT * FROM vw_all_bills');
    return result.rows;
};

/**
 * Retrieve a single bill by its ID.
 * @param {number|string} id - bill ID
 * @returns {Promise<Object|null>} bill object or null if not found
 */
export const findById = async (id) => {
    const result = await pool.query('SELECT * FROM vw_all_bills WHERE id_bill = $1', [id]);
    return result.rows[0];
};

/**
 * Insert a new bill into the database.
 * @param {string} bill_quarter
 * @param {number} amount_billed
 * @param {number}_paid
 * @param {number} id_payment_method
 * @param {number} id_client
 * @param {number} id_transaction
 */
export const insertBill = async (bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction) => {
    const result = await pool.query('INSERT INTO bills (bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction]
    );
    return result.rows[0];
};

/**
 * Update an existing bill by its ID.
 * @param {number|string} id - bill ID
 * @param {string} bill_quarter
 * @param {number} amount_billed
 * @param {number} paid
 * @param {number} id_payment_method
 * @param {number} id_client
 * @param {number} id_transaction
 */
export const updateBill = async (id, bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction) => {
    const result = await pool.query('UPDATE bills SET bill_quarter = $1, amount_billed = $2, amount_paid = $3, id_client = $4, id_payment_method = $5, id_transaction = $6 WHERE id_bill = $7 RETURNING *',
        [bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction, id]
    );
    return result.rows[0];
};

/**
 * Delete an bill by its ID.
 * @param {number|string} id - bill ID
 * @returns {Promise<Object|null>} The deleted bill object or null if not found
 */
export const deleteBill = async (id) => {
    const result = await pool.query('DELETE FROM bills WHERE id_bill = $1 RETURNING *', [id]);
    return result.rows[0];
};
