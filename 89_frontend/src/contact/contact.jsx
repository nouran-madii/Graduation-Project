import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Users,
  CheckCircle,
} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8 text-[#514232]" />,
      title: "Email Us",
      primary: "support@jobhub.com",
      secondary: "careers@jobhub.com",
      description: "Get in touch via email for any inquiries",
    },
    {
      icon: <Phone className="w-8 h-8 text-[#514232]" />,
      title: "Call Us",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 987-6543",
      description: "Speak directly with our support team",
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#514232]" />,
      title: "Visit Us",
      primary: "123 Innovation Street",
      secondary: "San Francisco, CA 94105",
      description: "Come visit our headquarters",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#514232]" />,
      title: "Office Hours",
      primary: "Mon - Fri: 9:00 AM - 6:00 PM",
      secondary: "Weekend: 10:00 AM - 4:00 PM",
      description: "Our availability throughout the week",
    },
  ];

  const inquiryTypes = [
    {
      icon: <HelpCircle className="w-6 h-6 text-[#514232]" />,
      title: "General Support",
      description: "Questions about our platform and services",
    },
    {
      icon: <Users className="w-6 h-6 text-[#514232]" />,
      title: "For Graduates",
      description: "Job search assistance and career guidance",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#514232]" />,
      title: "For Employers",
      description: "Partnership opportunities and hiring solutions",
    },
  ];

  const faqs = [
    {
      question: "How do I create an account on Job Hub?",
      answer:
        "Simply click the 'Sign Up' button and follow the registration process. It takes less than 5 minutes to set up your profile.",
    },
    {
      question: "Is Job Hub free for graduates?",
      answer:
        "Yes! Job Hub is completely free for graduates. We believe in removing barriers to career opportunities.",
    },
    {
      question: "How does the job matching work?",
      answer:
        "Our AI algorithm analyzes your skills, preferences, and career goals to match you with relevant job opportunities from our partner companies.",
    },
    {
      question: "How can employers partner with Job Hub?",
      answer:
        "Employers can contact us through this form or email careers@jobhub.com to discuss partnership opportunities and access our talent pool.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F1EF] text-[#514232] font-sans">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#514232]">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-[#514232] opacity-80 max-w-3xl mx-auto leading-relaxed">
            Have questions? We're here to help you succeed in your career
            journey. Reach out to us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4 bg-[#B8B2A8] rounded-full w-16 h-16 items-center mx-auto">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-[#514232]">
                {info.title}
              </h3>
              <p className="text-[#514232] font-semibold mb-1">
                {info.primary}
              </p>
              <p className="text-[#514232] opacity-70 mb-3">{info.secondary}</p>
              <p className="text-sm text-[#514232] opacity-60">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-[#514232]">
                Send Us a Message
              </h2>
              {isSubmitted ? (
                <div className="bg-[#F1F1EF] rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#514232] mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[#514232] opacity-80 mb-6">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#514232] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#514232] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#B8B2A8] focus:border-[#514232] focus:outline-none transition-colors duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#514232] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#B8B2A8] focus:border-[#514232] focus:outline-none transition-colors duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#514232] mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#B8B2A8] focus:border-[#514232] focus:outline-none transition-colors duration-300"
                    >
                      <option value="general">General Support</option>
                      <option value="graduate">Graduate Support</option>
                      <option value="employer">Employer Partnership</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feedback">Feedback & Suggestions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#514232] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#B8B2A8] focus:border-[#514232] focus:outline-none transition-colors duration-300"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#514232] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-[#B8B2A8] focus:border-[#514232] focus:outline-none transition-colors duration-300 resize-vertical"
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="bg-[#514232] text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-[#B8B2A8] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 text-[#514232]">
                  How Can We Help?
                </h3>
                <div className="space-y-4">
                  {inquiryTypes.map((type, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-white rounded-lg p-2 flex-shrink-0">
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#514232] mb-1">
                          {type.title}
                        </h4>
                        <p className="text-sm text-[#514232] opacity-80">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#514232]">
                  Response Time
                </h3>
                <div className="space-y-3 text-sm text-[#514232]">
                  <div className="flex justify-between">
                    <span>General Inquiries:</span>
                    <span className="font-semibold">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Issues:</span>
                    <span className="font-semibold">4-8 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partnership Requests:</span>
                    <span className="font-semibold">48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-[#514232]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold mb-2 text-[#514232]">
                    {faq.question}
                  </h4>
                  <p className="text-[#514232] opacity-80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
