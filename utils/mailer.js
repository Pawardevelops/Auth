import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        console.log(email,emailType,userId,"uData")
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
            });
            console.log(userId, "userId");
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 },
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "2c6fec23dfe4e1",
                pass: "6f4e27b40682b2",
            },
        });

        const verifyEmailHTML = `
            <div style="background-color: #e9ecef; font-family: Arial, sans-serif; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-top: 3px solid #d4dadf;">
                    <div style="text-align: center; padding: 36px 24px;">
                        <img src="https://your-logo-url.com/logo.png" alt="Logo" style="width: 48px;" />
                    </div>
                    <div style="padding: 36px 24px 0; border-top: 3px solid #d4dadf;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; line-height: 48px;">
                            Confirm Your Email Address
                        </h1>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff;">
                        <p>Tap the button below to confirm your email address. If you didn't create an account, you can safely delete this email.</p>
                    </div>
                    <div style="text-align: center; padding: 12px;">
                        <a href="${`${process.env.DOMAIN}/verifyemail?token=${hashedToken}`}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; background-color: #1a82e2; border-radius: 6px; text-decoration: none;">
                            Confirm Email
                        </a>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff;">
                        <p>If that doesn't work, copy and paste the following link in your browser:</p>
                        <p><a href="${`${process.env.DOMAIN}/verifyemail?token=${hashedToken}`}" target="_blank">${`${process.env.DOMAIN}/verifyemail?token=${hashedToken}`}</a></p>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff; border-bottom: 3px solid #d4dadf;">
                        <p>Cheers,<br>Airender</p>
                    </div>
                    <div style="padding: 24px;">
                        <p>You received this email because we received a request to verify your email for your account. If you didn't request this, you can safely delete this email.</p>
                        <p>Airender 1234 S. Broadway St. City, State 12345</p>
                    </div>
                </div>
            </div>
        `;

        const resetEmailHTML = `
            <div style="background-color: #e9ecef; font-family: Arial, sans-serif; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-top: 3px solid #d4dadf;">
                    <div style="text-align: center; padding: 36px 24px;">
                        <img src="https://your-logo-url.com/logo.png" alt="Logo" style="width: 48px;" />
                    </div>
                    <div style="padding: 36px 24px 0; border-top: 3px solid #d4dadf;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; line-height: 48px;">
                            Reset Your Password
                        </h1>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff;">
                        <p>Tap the button below to reset your password. If you didn't request a password reset, you can safely delete this email.</p>
                    </div>
                    <div style="text-align: center; padding: 12px;">
                        <a href="${`${process.env.DOMAIN}/resetpassword/verify?token=${hashedToken}`}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; background-color: #1a82e2; border-radius: 6px; text-decoration: none;">
                            Reset Password
                        </a>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff;">
                        <p>If that doesn't work, copy and paste the following link in your browser:</p>
                        <p><a href="${`${process.env.DOMAIN}/forgotpassword?token=${hashedToken}`}" target="_blank">${`${process.env.DOMAIN}/forgotpassword?token=${hashedToken}`}</a></p>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff; border-bottom: 3px solid #d4dadf;">
                        <p>Cheers,<br>Airender</p>
                    </div>
                    <div style="padding: 24px;">
                        <p>You received this email because we received a request to reset your password for your account. If you didn't request this, you can safely delete this email.</p>
                        <p>Airender 1234 S. Broadway St. City, State 12345</p>
                    </div>
                </div>
            </div>
        `;

        const mailOptions = {
            from: '"Airender" <airender.co>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: emailType ==="VERIFY" ? verifyEmailHTML : resetEmailHTML,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (err) {
        console.log(err);
    }
};
