import React, { useState } from "react";
import * as Icons from "react-icons/fi";
import contactData from "../data/contactData.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append("entry.1781500597", formData.name); // Name
    data.append("entry.1640447617", formData.email); // Email
    data.append("entry.2040870261", formData.message); // Message
    // Add subject if you have a field for it in Google Forms
    // data.append("entry.XXXXXXXX", formData.subject); // Subject

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfhiC1j8SjWTzbMjQnAX9zIh4UdfTxbeWvUP8ci5sUMJVSTPQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: data,
        }
      );
      alert("Message sent successfully! Thank you for reaching out.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  const { header, contactInfo, socialLinks, form } = contactData;

  return (
    <div className="min-h-screen pt-20 section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
            {header.title}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            {header.subtitle}
          </p>
        </div>

        <div className="grid max-w-6xl gap-12 mx-auto lg:grid-cols-2">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              Let's Connect
            </h2>

            <div className="mb-8 space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = Icons[info.icon];
                return (
                  <div
                    key={idx}
                    className="flex items-center p-4 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
                  >
                    <div className="p-3 mr-4 rounded-lg bg-primary-100 dark:bg-primary-900">
                      <Icon
                        className="text-primary-600 dark:text-primary-400"
                        size={24}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {info.type}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, idx) => {
                  const Icon = Icons[social.icon];
                  return (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 text-gray-600 transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-xl"
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-white shadow-lg dark:bg-gray-800 rounded-2xl"
            >
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {form.fields.name.label}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={form.fields.name.placeholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {form.fields.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={form.fields.email.placeholder}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {form.fields.subject.label}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={form.fields.subject.placeholder}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {form.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 transition-colors duration-300 border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={form.fields.message.placeholder}
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full px-6 py-4 font-medium text-white transition-all duration-300 rounded-lg bg-primary-600 hover:bg-primary-700 group"
              >
                <Icons.FiSend className="mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                {form.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
