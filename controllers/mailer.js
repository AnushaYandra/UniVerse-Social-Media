import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD,
    }
});

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
    }
});

export const registerMail = async (req, res) => {
    try {

        console.log("Request Body:", req.body);

        const { username, userEmail, text, subject } = req.body;
        console.log( username, userEmail)

        const email = {
            body: {
                name: username,
                intro: text || "Welcome to Daily Tuition! We are very excited to have you on board.",
                outro: "Need help, or have questions? Just reply to this email, we would love to help.",
            }
        };

        const emailBody = mailGenerator.generate(email);

        const message = {
            from: ENV.EMAIL,
            to: userEmail,
            subject: subject || "Signup Successful",
            html: emailBody,
        };

        await transporter.sendMail(message);
        return res.status(200).send({ msg: "You should receive an email from us." });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ error: "Failed to send email" });
    }
};
