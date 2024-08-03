import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bycrpt from 'bcrypt'
import validator from 'validator'
import { response } from "express";

// Login user
const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message:"User doesn't exist"
            })
        }
        const isMatch = await bycrpt.compare(password,user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message:"Invalid Credintials"
            })
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error
        })
    }


}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({
                success: false,
                message:"User already exist"
            })
        }

        // validating email and strong pass

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message:"Please enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message:"Please Enter strong password"
            })
        }

        // hashing password

        const salt = await bycrpt.genSalt(10)
        const hashedPassword = await bycrpt.hash(password, salt);

        // new user 
        const newUser = new userModel({
            name: name,
            email: email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({
            success:true
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error        })
    }
}

export {registerUser,loginUser}