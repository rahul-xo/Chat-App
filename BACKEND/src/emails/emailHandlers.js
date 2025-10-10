import { Resend } from "resend";
import { resendClient, sender } from "../Services/resend.service.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome To Benevolent!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  if (error) {
    console.error("error : ", error);
    throw new Error("failed to Send email");
  }
};
