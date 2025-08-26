import { motion } from 'framer-motion';
import {
    CheckCircle,
    Clock,
    ExternalLink,
    Heart,
    Mail,
    MapPin,
    Phone,
    Send
} from 'lucide-react';
import React, { useState } from 'react';

// Mock components for self-containment
const Button = ({ children, ...props }) => (
  <button {...props} className={`p-4 rounded-md font-semibold transition-colors duration-200 ${props.className}`}>{children}</button>
);
const Card = ({ children, className }) => <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="p-6">{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
const CardContent = ({ children }) => <div className="p-6 pt-0">{children}</div>;
const Input = (props) => <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-300" />;
const Label = ({ htmlFor, children }) => <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">{children}</label>;
const Textarea = (props) => <textarea {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-300" />;

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ContactPage: React.FC<ContactPageProps> = ({ onPageChange }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For all form submissions, redirect to WhatsApp
    const message = `Assalamu Alaikum, my name is ${formData.name}. 
    Subject: ${formData.subject}
    ${formData.message ? `Message: ${formData.message}` : ''}
    Contact me at: ${formData.email} ${formData.phone ? `or ${formData.phone}` : ''}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918423370548?text=${encodedMessage}`, '_blank');
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/a4mLk2aSqVi9q7Uq5', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.section 
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Get in touch with us for admissions, inquiries, or to learn more about our programs
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Information and Form */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-[#0B0D0E] mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: ["MASAUNI, POST OFFICE KALINJAR,", "TEHSIL NARAINI, DISTRICT BANDA (UP)", "PINCODE-210129"],
                    color: "#1F7A53"
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: ["+91 9452463669", "+91 7880927738"],
                    color: "#1E5FA8"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: ["info@madarsa-arabia.edu", "admissions@madarsa-arabia.edu"],
                    color: "#1F7A53"
                  },
                 
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-[#0B0D0E] mb-1">{item.title}</h3>
                        {item.content.map((line, i) => (
                          <p key={i} className="text-gray-600">{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map Preview */}
              <motion.div 
                className="rounded-lg h-64 relative overflow-hidden cursor-pointer group"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={handleMapClick}
              >
                {/* Embedded Google Maps Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.162799307399!2d80.4543818!3d25.021086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39833f600f2a7453%3A0x845346b3ee64c093!2sMadarsa%20arabia%20tajveedul%20quran!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
                
                {/* Overlay with button */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-4 py-2 rounded-full shadow-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExternalLink className="w-4 h-4 text-[#1F7A53] mr-2" />
                    <span className="text-sm font-medium text-[#1F7A53]">Open in Google Maps</span>
                  </motion.div>
                </div>
                
                {/* Location pin indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="red" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0B0D0E]">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you via WhatsApp.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-16 h-16 text-[#1F7A53] mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-[#1F7A53] mb-2">
                        Redirecting to WhatsApp!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. You will be redirected to WhatsApp to continue the conversation.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          variants={itemVariants}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                          />
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          variants={itemVariants}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                          />
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                        >
                          <Label htmlFor="subject">Subject *</Label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50 transition-all duration-300"
                            required
                          >
                            <option value="">Select Subject</option>
                            <option value="admissions">Admissions Inquiry</option>
                            <option value="programs">Program Information</option>
                            <option value="facilities">Facilities & Services</option>
                            <option value="donation">Donation & Support</option>
                            <option value="general">General Inquiry</option>
                          </select>
                        </motion.div>
                      </div>

                      <motion.div
                        variants={itemVariants}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          placeholder="Please provide details about your inquiry..."
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-[#1F7A53]/50 focus:border-[#1F7A53] hover:border-[#1F7A53]/50"
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          size="lg" 
                          disabled={isSubmitting}
                          className="w-full bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send via WhatsApp
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Donation Information Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[#E8F5EF] to-[#EAF2FB]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Support Our Mission
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your donations help us continue providing quality Islamic education to our students
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Bank Transfer",
                description: "Direct bank transfer to our account",
                details: [
                  "Bank Name: Islamic Bank",
                  "Account Name: Madarsa Arabia",
                  "Account Number: 1234 5678 9012 3456",
                  "IBAN: IBAN1234567890123456",
                  "SWIFT/BIC: ISLAMICBANK"
                ]
              },
              {
                title: "Online Payment",
                description: "Secure online payment through our portal",
                details: [
                  "Credit/Debit Card",
                  "PayPal",
                  "Islamic Payment Gateways",
                  "Recurring donations available"
                ]
              },
              {
                title: "In-Person Donation",
                description: "Visit our campus to make a donation",
                details: [
                  "Cash donations accepted",
                  "Office hours: Saturday - Thursday, 8AM-6PM",
                  "Receipt provided immediately",
                  "Zakat and Sadaqah both accepted"
                ]
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-card hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[#1F7A53] mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
                <ul className="space-y-2">
                  {method.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#1F7A53] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-gray-700 mb-6">
              For more information about donations or to discuss specific projects you'd like to support, 
              please contact our donation department directly via WhatsApp.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 50%)"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to Join Us?
              </h2>
              <p className="text-xl text-white/90">
                Take the first step towards quality Islamic education. 
                Our admissions team is here to guide you through the process.
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1F7A53] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onPageChange('departments')}
                >
                  View Programs
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => onPageChange('about')}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;