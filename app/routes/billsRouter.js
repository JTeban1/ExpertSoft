import { Router } from 'express';
import * as billsController from '../controllers/billsController.js';

/**
 * This router manages all HTTP endpoints related to bills operations
 * such as creating, reading, updating, and deleting bills.
 * 
 * @type {import('express').Router}
 */
const router = Router();

router.get('/', billsController.getAllBills);
router.get('/client/:id_client', billsController.getBillsByClientId);
router.get('/:id', billsController.getBillById);
router.post('/', billsController.insertBill);
router.put('/:id', billsController.updateBill);
router.delete('/:id', billsController.deleteBill);

export default router;