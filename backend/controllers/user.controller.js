import User from "../models/user.model.js"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({success: true, user})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({success: false, message: 'Fields Missing'})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Invalid Email'})
        }

        const isUser = await User.findOne({email});
        if (isUser) {
            return res.status(400).json({success: false, message: 'User already exists'})
        }

        if (password.length < 5) {
            return res.status(400).json({success: false, message: 'Weak Password'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();

        const user = newUser.toObject();
        delete user.password;

        generateToken(newUser._id, res);
        res.status(200).json({success: true, user: user, message: 'Account Created'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({success: false, message: 'Fields Missing'})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Invalid Email'})
        }

        const isUser = await User.findOne({email});
        if (!isUser) {
            return res.status(400).json({success: false, message: 'User does not exists'})
        }

        const isPassword = await bcrypt.compare(password, isUser.password);
        if (!isPassword) {
            return res.status(400).json({success: false, message: 'Incorrect Password'});
        }

        const user = isUser.toObject();
        delete user.password;
        
        generateToken(isUser._id, res);
        res.status(200).json({success: true, user: user, message: 'Welcome Back'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        });
        res.status(200).json({success: true, message: 'Logged Out'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}