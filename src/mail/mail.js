import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.NodeMailerUserName,
        pass: process.env.NodeMailerPassword,
    },
});

export const sendUserOtpMail = async (email,name,otp) => {
    try {

        
        const info = await transporter.sendMail({
            from: 'Ravi Singh job ',
            to: email,
            subject: "Hello ✔",
            text: "Hello world?", 
            html: `
            <h1>Hi ${name}</h1>
            <p>your otp is ${otp}</p>
            `, 
        });

        console.log("Message sent:", info.messageId);
    }
    catch (err) {
        console.log(err.message)
    }
}
   