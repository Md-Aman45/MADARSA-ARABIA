import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

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
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
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
                    content: ["123 Education Street", "Islamic City, IC 12345", "United States"],
                    color: "#1F7A53"
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
                    color: "#1E5FA8"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: ["info@madarsa-arabia.edu", "admissions@madarsa-arabia.edu"],
                    color: "#1F7A53"
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    content: ["Saturday - Thursday: 8:00 AM - 6:00 PM", "Friday: Community Programs"],
                    color: "#1E5FA8"
                  }
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

              {/* Map Placeholder */}
              <motion.div 
                className="bg-gradient-to-tr from-gray-100 to-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F7A53]/10 to-[#1E5FA8]/10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <div className="relative text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Location: Islamic City, IC 12345</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#0B0D0E]">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
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
                      <h3 className="text-xl font-semibold text-[#1F7A53] mb-2">Message Sent!</h3>
                      <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
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
                              Send Message
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

      {/* Donation Options */}


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
                  className="border-blue text-black  text-[#1F7A53]"
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