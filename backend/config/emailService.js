import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Gmail not configured properly");
  } else {
    console.log("Gmail configured properly and ready to send email");
  }
});

async function sendOtpToEmail(email, otp) {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #075e54;">🔐 Email Verification</h2>
      
      <p>Hi there,</p>
      
      <p>Your one-time password (OTP) to verify your account is:</p>
      
      <h1 style="background: #e0f7fa; color: #000; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 2px;">
        ${otp}
      </h1>

      <p><strong>This OTP is valid for the next 5 minutes.</strong> Please do not share this code with anyone.</p>

      <p>If you didn’t request this OTP, please ignore this email.</p>

      <p style="margin-top: 20px;">Thanks & Regards,<br/>Highway Delite Team</p>

      <hr style="margin: 30px 0;" />

      <small style="color: #777;">This is an automated message. Please do not reply.</small>
    </div>
  `;

  const mailOptions = {
    from: `Highway Delite Team <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your one-time password to verify your account",
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error in sending email: ", error);
    } else {
      console.log("Email sent");
    }
  });
}

export default sendOtpToEmail;
