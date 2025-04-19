import React, { useState } from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../utils/socialConstants";
import { sendContactEmail, ContactFormData } from "../services/emailService";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      await sendContactEmail(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Get in Touch
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="sheikah-border p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-zelda-light-blue mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zelda-dark border border-zelda-light-blue rounded focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-zelda-light-blue mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zelda-dark border border-zelda-light-blue rounded focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-zelda-light-blue mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zelda-dark border border-zelda-light-blue rounded focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-zelda-light-blue mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-zelda-dark border border-zelda-light-blue rounded focus:outline-none focus:ring-2 focus:ring-zelda-gold text-white"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-2 bg-zelda-gold text-zelda-dark rounded hover:bg-zelda-light-blue transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>

            {status === "success" && (
              <div className="text-center text-green-400">
                Message sent successfully!
              </div>
            )}

            {status === "error" && (
              <div className="text-center text-red-400">{errorMessage}</div>
            )}
          </form>

          <div className="text-center">
            <p className="text-zelda-light-blue mb-4">Or connect with me on:</p>
            <div className="flex justify-center space-x-6">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
