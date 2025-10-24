import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Instagram, Send } from "lucide-react";

const ContactSection = ({ isDark }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = new URLSearchParams();
    data.append("entry.1781500597", formData.get("name")); // Name
    data.append("entry.1640447617", formData.get("email")); // Email
    data.append("entry.2040870261", formData.get("message")); // Message

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfhiC1j8SjWTzbMjQnAX9zIh4UdfTxbeWvUP8ci5sUMJVSTPQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: data,
        }
      );
      alert("Message sent! Thank you.");
      form.reset();
    } catch (err) {
      alert("Oops! Something went wrong.");
    }
  };

  return (
    <div className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
      <div className="max-w-4xl px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Get In Touch
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-xl font-semibold">Let's work together!</h3>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              I'm always interested in hearing about new opportunities and
              interesting projects. Feel free to reach out if you'd like to
              collaborate!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <a
                  href="mailto:neeleshy263@gmail.com"
                  className="transition-colors hover:text-blue-600"
                >
                  neeleshy263@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <a
                  href="tel:+919166117663"
                  className="transition-colors hover:text-blue-600"
                >
                  +91 9166117663
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-blue-600" />
                <a
                  href="https://github.com/Neelesh-FS-Dev"
                  className="transition-colors hover:text-blue-600"
                >
                  github.com/Neelesh-FS-Dev
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <a
                  href="https://www.linkedin.com/in/neeleshyadav/"
                  className="transition-colors hover:text-blue-600"
                >
                  linkedin.com/in/neeleshyadav
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-500" />
                <a
                  href="https://www.instagram.com/neelesh.yadav25"
                  className="transition-colors hover:text-pink-500"
                >
                  instagram.com/neelesh.yadav25
                </a>
              </div>
            </div>
          </div>

          {/* Custom Form */}
          <div
            className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                      : "bg-white border-gray-300 focus:border-blue-500"
                  } focus:outline-none`}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                      : "bg-white border-gray-300 focus:border-blue-500"
                  } focus:outline-none`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                      : "bg-white border-gray-300 focus:border-blue-500"
                  } focus:outline-none resize-none`}
                  placeholder="Your message here..."
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
