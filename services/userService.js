import pool from '../config/db.js';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { sendTelegramOtp } from '../utils/telegramUtils.js';

export const registerUser = async ({ username, email, password, phone, otpDeliveryMethod }) => {
    const hashedPassword = await hashPassword(password);
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const res = await client.query('INSERT INTO users (username, email, password, phone, otp, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, hashedPassword, phone, otp, 'pending']);

        if (otpDeliveryMethod === 'email') {
            await sendOtpByEmail(email, otp);
        } else if (otpDeliveryMethod === 'telegram') {
            await sendTelegramOtp(phone, otp);
        }

        await client.query('COMMIT');
        return res.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Registration failed');
    } finally {
        client.release();
    }
};

export const verifyUserOtp = async ({ phone, otp }) => {
    const client = await pool.connect();
    try {
        const res = await client.query('UPDATE users SET status = $1 WHERE phone = $2 AND otp = $3 RETURNING *', ['active', phone, otp]);
        if (res.rowCount === 0) throw new Error('Invalid OTP or phone number');
        return res.rows[0];
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
};

export const loginUser = async ({ username, password }) => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (res.rowCount === 0) throw new Error('Incorrect username or password');

        const user = res.rows[0];
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error('Incorrect username or password');

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
};

const sendOtpByEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    await transporter.sendMail(mailOptions);
};
