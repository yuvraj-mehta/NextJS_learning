import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "24608a41dbbc87",
        pass: "43bd6acc2ee51f",
      },
    });

    const mailOptions = {
      from: "learning@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
      <p>${
        emailType === "VERIFY"
          ? "Please verify your email by clicking the link below:"
          : "Please reset your password by clicking the link below:"
      }
      or copy and paste the following link into your browser:
      <br />
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>
      <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Click here</a>
      `,
    };
    console.log("Sending email with options:", mailOptions);

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse);
    return mailResponse;
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
