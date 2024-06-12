import { registerUser, verifyUserOtp, loginUser } from '../services/userService.js';

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User created and OTP sent.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const user = await verifyUserOtp(req.body);
        res.status(200).json({ message: 'Verification successful and user activated.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
