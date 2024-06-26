'use server'
import bcryptjs from 'bcryptjs';
import connectDB from "@/database"
import User from "@/models";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function signUpAction(formData) {
    await connectDB();
    try {
        const { userName, email, password } = formData;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return {
                success: false,
                message: 'User already exists ! Please try another email'
            }
        }
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName, email, password: hashpass
        });

        const saveUser = await newUser.save();
        if (saveUser) {
            return {
                success: true,
                message: 'User Register Successful',
                data: JSON.parse(JSON.stringify(saveUser))
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong!'
        }
    }
}

export async function signInAction(formData) {
    await connectDB();
    try {
        const { email, password } = formData;
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return {
                success: false,
                message: 'User doesnot exists ! Please signup'
            }
        }
        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword) {
            return {
                success: false,
                message: 'Password is incorrect ! Please try again'
            }
        }
        const createTokenData = {
            id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email
        }
        const token = jwt.sign(createTokenData, process.env.SECRET_KEY, { expiresIn: 36000 });

        const getCookies = cookies();
        getCookies.set('token', token);

        return {
            success: true,
            message: 'Login is Successfull'
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong!'
        }
    }
}

export async function authUserAction() {
    await connectDB();
    try {
        const getCookies = cookies();
        const token = getCookies.get('token')?.value || "";
        if (token === '') {
            return {
                success: false,
                message: 'Token is invalid!'
            }
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const getUser = await User.findOne({ _id: decode.id });
        if (getUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUser))
            }
        } else {
            return {
                success: false,
                message: 'Some error occured! Please try again'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong!'
        }
    }
}

export async function logOutAction() {
    const getCookies = cookies();
    getCookies.set('token', '');
}