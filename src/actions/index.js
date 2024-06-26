'use server'
import bcryptjs from 'bcryptjs';
import connectDB from "@/database"
import User from "@/models";

export async function signUpAction(formData){
    await connectDB();
    try {
        const {userName, email, password} = formData;
        const checkUser = await User.findOne({email});
        if(checkUser){
            return {
                success: false,
                message: 'User already exists ! Please try another email'
            }
        }
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName, email, password:hashpass
        });

        const saveUser = await newUser.save();
        if(saveUser){
            return {
                success: true,
                message: 'User Register Successful',
                data: JSON.parse(JSON.stringify(saveUser))
            }
        }

    } catch (error) {
        console.log(error);
        return{
            success: false,
            message: 'Something went wrong!'
        }
    }
}