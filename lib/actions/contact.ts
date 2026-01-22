"use server";

export async function submitContactForm(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const topic = formData.get("topic") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  try {
    // -------------------------------------------------------------------------
    // WEB3FORMS INTEGRATION
    // -------------------------------------------------------------------------
    // Using environment variable for security
    const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (!ACCESS_KEY) {
        console.warn("⚠️ Web3Forms Access Key is missing in .env.local file");
        // Fallback for demo purposes if key is not set
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { success: true, message: "Simulation: Message 'sent' (Set up WEB3FORMS_ACCESS_KEY in .env.local)" };
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: name,
        email: email,
        subject: `New Message from ${name} - ${topic || "Contact Form"}`,
        message: message,
        // Optional: Web3Forms spam protection
        botcheck: false, 
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: "Message sent successfully! We'll get back to you soon." };
    } else {
      console.error("Web3Forms Error:", result);
      return { success: false, message: "Failed to send message. Please try again." };
    }

  } catch (error) {
    console.error("Error processing contact form:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}
