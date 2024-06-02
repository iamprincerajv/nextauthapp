import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        //extract data from token

        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select("-password");

        if(!user) {
            return NextResponse.json({error: "User Not Found"}, {status: 400});
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}