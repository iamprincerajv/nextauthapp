import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
    
        const {username, email, password} = reqBody;
        // validation

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        
        const userId = savedUser._id.toString();
        

        // send verification email

        await sendEmail({email, emailType: "VERIFY", userId});

        return NextResponse.json({
            message: "User registered successfully!",
            savedUser,
            success: true,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}