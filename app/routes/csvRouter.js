/**
 * CSV upload router for handling CSV file uploads and inserting data into database tables.
 * @module routes/csvRouter
 */
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import pool from '../../config/db_conn.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

/**
 * Insert a row of data into the specified table.
 * @param {Object} data - Row data as key-value pairs
 * @param {string} table - Table name to insert into
 */
async function insertRow(data, table) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.join(', ');
    const rows = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO ${table} (${columns}) VALUES (${rows})`;

    await pool.query(query, values);
}

/**
 * POST endpoint to upload a CSV file and insert its data into a database table.
 * Expects a 'file' field in the multipart form and a 'table' query parameter.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post('/', upload.single('file'), (req, res) => {
    const { file } = req;
    const { table } = req.query;
    
    if (!table) {
        return res.status(400).send('You must select a table');
    }
    if (!file) {
        return res.status(400).send('There is no file selected');
    }

    const rows = [];

    fs.createReadStream(file.path, { encoding: 'utf-8'})
        .pipe(csv())
        .on('data', (data) => {
            rows.push(data);
        })
        .on('end', async () => {
            try {
                for (const row of rows) {
                    await insertRow(row, table);
                }
            res.status(200).send('Upload completed successfully');
            } catch (error) {
                console.error('Error while inserting data', error);
                res.status(500).send('Error while handling the file');
            } finally {
                
                fs.unlinkSync(file.path);
            }
        });
});

export default router;
