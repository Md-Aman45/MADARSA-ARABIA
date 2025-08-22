import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Clock,
    Heart,
    Mail,
    MapPin,
    Phone,
    Users
} from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const quickLinks = [
    { name: 'Home', key: 'home' },
    { name: 'About Us', key: 'about' },
    { name: 'Programs', key: 'programs' },
    { name: 'Resources', key: 'resources' },
    { name: 'Notice', key: 'notice' },
    { name: 'Contact', key: 'contact' },
  ];

  const programs = [
    'Qur\'anic Recitation (Tajweed)',
    'Hifz Program',
    'Hadith Studies',
    'Fiqh & Usul',
    'Arabic Language',
    'Library Services'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#0B0D0E] to-gray-900 text-white">
      {/* Top gradient strip */}
      <div className="h-1 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8]"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-xl">م</span>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">MADARSA ARABIA</h3>
                <p className="text-[#1F7A53] text-sm">TAJVEEDUL QURAN</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dedicated to preserving and teaching the sacred knowledge of Islam 
              through traditional and modern methodologies since 1999.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: BookOpen, label: "Excellence" },
                { icon: Heart, label: "Care" },
                { icon: Users, label: "Community" },
                { icon: Award, label: "Achievement" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(31, 122, 83, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                    title={item.label}
                  >
                    <IconComponent className="w-5 h-5 text-[#1F7A53]" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <motion.button
                    onClick={() => onPageChange(link.key)}
                    className="text-gray-300 hover:text-[#1F7A53] transition-colors duration-300 text-left"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-white">Our Programs</h3>
            <ul className="space-y-3">
              {programs.slice(0, 6).map((program, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => onPageChange('programs')}
                    className="text-gray-300 hover:text-[#1E5FA8] transition-colors duration-300 text-left text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {program}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#1F7A53] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Education Street<br />
                    Islamic City, IC 12345<br />
                    United States
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#1E5FA8] flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                  <p className="text-gray-300 text-sm">+1 (555) 123-4568</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#1F7A53] flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">info@madarsa-arabia.edu</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#1E5FA8] flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Sat-Thu: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-300 text-sm">Friday: Community Programs</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} Madarsa Arabia Tajveedul Quran. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Preserving Islamic knowledge through traditional and modern education.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange('contact')}
                  className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange('programs')}
                  className="border-[#1E5FA8] text-[#1E5FA8] hover:bg-[#1E5FA8] hover:text-white"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;