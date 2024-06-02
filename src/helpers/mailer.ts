import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface sendEmailProps {
    email: string,
    emailType: string,
    userId: string
}

export const sendEmail = async ({email, emailType, userId}: sendEmailProps) => {
    try {
        // TODO: configure mail for usage

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, {$set: {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
          }})
        } else if(emailType === "RESET") {
          await User.findByIdAndUpdate(userId, {$set: {
            forgotPasswordToken: hashedToken,
            forgotPawwordTokenExpiry: Date.now() + 3600000,
          }})
        }

        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
          }
        });

          const mailOptions = {
            from: 'smarttechking121@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the below link in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </p>` : `p>
          Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to reset your password or copy and paste the below link in your browser.
          <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
        </p>`,
          };

          const mailResponse = await transporter.sendMail(mailOptions);

          return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}