const nodemailer = require("nodemailer");

// Create transporter using SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send verification email
exports.sendVerificationEmail = async (userEmail, userName, verificationLink) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: "Email Verification - Bus Pass System",
      html: `
        <h2>Welcome to Bus Pass System!</h2>
        <p>Hi ${userName},</p>
        <p>Thank you for registering with us. Please verify your email address to activate your account.</p>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verificationLink}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not create this account, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Bus Pass System Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

// Send welcome email after verification
exports.sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: "Welcome to Bus Pass System",
      html: `
        <h2>Email Verified Successfully!</h2>
        <p>Hi ${userName},</p>
        <p>Your email has been verified successfully. Your account is now active and you can start using the Bus Pass System.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse available bus passes</li>
          <li>Book your tickets</li>
          <li>Manage your profile</li>
          <li>View your booking history</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <br>
        <p>Best regards,<br>Bus Pass System Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

// Test email connection
exports.testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Email service is ready to send emails");
    return true;
  } catch (error) {
    console.error("Error verifying email service:", error);
    return false;
  }
};
