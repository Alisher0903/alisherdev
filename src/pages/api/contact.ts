import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Send to your backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      },
    );

    if (response.ok) {
      res.status(200).json({ message: "Message sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send message" });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
