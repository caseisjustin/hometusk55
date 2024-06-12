import { createDebt, retrieveDebts, modifyDebt, removeDebt } from '../services/debtService.js';

export const addDebt = async (req, res) => {
    try {
        const debt = await createDebt(req.user.id, req.body);
        res.status(201).json({ message: 'New debt added.', debt });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDebts = async (req, res) => {
    try {
        const debts = await retrieveDebts(req.user.id, req.query.status);
        res.status(200).json(debts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDebt = async (req, res) => {
    try {
        const debt = await modifyDebt(req.user.id, req.params.id, req.body);
        res.status(200).json({ message: 'Debt updated.', debt });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDebt = async (req, res) => {
    try {
        await removeDebt(req.user.id, req.params.id);
        res.status(200).json({ message: 'Debt deleted.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
