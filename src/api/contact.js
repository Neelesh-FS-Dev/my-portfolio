// api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["neeleshy263@gmail.com"], // ← your email
        reply_to: email,
        subject: subject
          ? `[Portfolio] ${subject}`
          : `[Portfolio] Message from ${name}`,
        html: `
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Resend error:", err);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again." });
  }
}
