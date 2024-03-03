import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.gmailauth,
        pass: process.env.gmailpass,
      },
    });

    const mailOptions = {
      from: "mykel.me7@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Your reset code is:${resetToken} `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Failed to send reset email' });
        }
        console.log('Reset email sent:', info.response);
        return res.status(200).json({ message: 'Password reset email sent successfully' });
      });

  } catch (error) {
    console.error("Error sending password reset email:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
