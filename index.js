const nodemailer = require("nodemailer");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    const { name, email, subject, description } = req.body;

    // Nodemailer setup using Mailjet SMTP
    const transporter = nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER, // Your Mailjet API Key
            pass: process.env.SMTP_PASS  // Your Mailjet Secret Key
        },
    });

    try {
        await transporter.sendMail({
            from: `"Healthflow" <ansqazzafi@gmail.com>`,
            to: "recipient@example.com", // Change this to your recipient email
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\ndescription: ${description}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject}</p>,
                   <p><strong>Subject:</strong> ${description}</p>`,
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email." });
    }
}
