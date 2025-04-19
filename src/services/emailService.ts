import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.REACT_APP_AWS_REGION || "us-west-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "",
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (
  formData: ContactFormData
): Promise<void> => {
  const { name, email, subject, message } = formData;

  const verifiedEmail = process.env.REACT_APP_VERIFIED_EMAIL;
  if (!verifiedEmail) {
    throw new Error("Verified email address is not configured");
  }

  console.log("Using verified email:", verifiedEmail);
  console.log("AWS Region:", process.env.REACT_APP_AWS_REGION);

  const params = {
    Source: verifiedEmail,
    Destination: {
      ToAddresses: [verifiedEmail],
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission: ${subject}`,
      },
      Body: {
        Text: {
          Data: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
          `,
        },
      },
    },
  };

  try {
    console.log("Sending email with params:", JSON.stringify(params, null, 2));
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};
