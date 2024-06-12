// import { getUsersList, modifyUser, removeUser } from '../services/adminService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersList();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await modifyUser(req.params.id, req.body);
        res.status(200).json({ message: 'User updated.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await removeUser(req.params.id);
        res.status(200).json({ message: 'User deleted.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
