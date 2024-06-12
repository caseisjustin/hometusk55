import pool from '../config/db.js';

export const createDebt = async (userId, { amount, description, due_date, status }) => {
    const client = await pool.connect();
    try {
        const res = await client.query('INSERT INTO debts (user_id, amount, description, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [userId, amount, description, due_date, status]);
        return res.rows[0];
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
};

export const retrieveDebts = async (userId, status) => {
    const client = await pool.connect();
    try {
        let query = 'SELECT * FROM debts WHERE user_id = $1';
        const values = [userId];

        if (status) {
            query += ' AND status = $2';
            values.push(status);
        }

        const res = await client.query(query, values);
        return res.rows;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
};

export const modifyDebt = async (userId, debtId, { amount, description, due_date, status }) => {
    const client = await pool.connect();
    try {
        const res = await client.query('UPDATE debts SET amount = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 AND user_id = $6 RETURNING *', [amount, description, due_date, status, debtId, userId]);
        if (res.rowCount === 0) throw new Error('Debt not found');
        return res.rows[0];
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
};

export const removeDebt = async (userId, debtId) => {
    const client = await pool.connect();
    try {
        const res = await client.query('DELETE FROM debts WHERE id = $1 AND user_id = $2', [debtId, userId]);
        if (res.rowCount === 0) throw new Error('Debt not found');
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
};
