
import * as billsModel from "../models/billsModels.js";

/**
 * Get all bills from the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const getAllBills = async (req, res) => {
    try {
        const bills = await billsModel.findAll();
        res.json(bills);
    } catch (error){
        console.error('Something failed in controller', error);
        res.status(500).json({error: 'Error obtaining bills'});
    }
};

/**
 * Get a single bills by its ID.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const getBillById = async (req, res) => {
    try {
        const { id: id } = req.params;
        const bills = await billsModel.findById(id);
    
    if (!bills) {
        return res.status(404).json({error: 'Bill not found'});
    }
    
    res.json(bills);
    } catch (error) {
        console.error('Failure while getting bill by id', error);
        res.status(500).json({error: 'Error getting bills'});
    }
};

/**
 * Get all bills by client ID.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const getBillsByClientId = async (req, res) => {
    try {
        const { id_patient: id_client } = req.params;
        const bills = await billsModel.findByClientId(id_client);
        res.json(bills);
    } catch (error) {
        console.error('Failure while getting bills by client ID', error);
        res.status(500).json({error: 'Error getting bills'});
    }
};

/**
 * Insert a new bill into the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const insertBill = async (req, res) => {
    try {
        const { bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction } = req.body;
        const bill = await billsModel.insertBill(bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction);
        res.status(201).json(bill);
    } catch (error) {
        console.error('Something failed while inserting bill', error);
        res.status(500).json({error: 'Error inserting bill'});
    }
};

/**
 * Update an existing bill by its ID.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const updateBill = async (req, res) => {
    try {
        const { id: id } = req.params;
        let { bill_quarter, amount_billed, amount_paid, id_client, id_transaction, id_payment_method } = req.body;
        // Convert empty string to null for integer fields
        if (id_client === "") id_client = null;
        if (id_transaction === "") id_transaction = null;
        if (id_payment_method === "") id_payment_method = null;
        const bill = await billsModel.updateBill(id, bill_quarter, amount_billed, amount_paid, id_client, id_payment_method, id_transaction);
        if (!bill) {
            return res.status(404).json({error: 'Bill not found'});
        }
        res.json(bill);
    } catch (error) {
        console.error('Failure while updating Bill', error);
        res.status(500).json({error: 'Error updating Bill'});
    }
};

/**
 * Delete an bill by its ID.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const deleteBill = async (req, res) => {
    try {
        const { id: id } = req.params;
        const bill = await billsModel.deleteBill(id);
        if (!bill) {
            return res.status(404).json({error: 'bill not found'});
        }
        res.json(bill);
    } catch (error) {
        console.error('Failure while deleting bill', error);
        res.status(500).json({error: 'Error deleting bill'});
    }
};

