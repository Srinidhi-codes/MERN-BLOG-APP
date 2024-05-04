import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existing = await User.findOne({ email })
        if (existing) {
            throw new Error('Already email registered, try with new email.')
        }
        // New user
        const hashingPassword = await hashPassword(password);
        const newUser = await new User({ name, email, password: hashingPassword }).save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: 'Registered Successfully',
            user: newUser._doc,
            token
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Credentials.')
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials.'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
        res.send({
            success: true,
            message: 'Login Success',
            user: user._doc,
            token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}