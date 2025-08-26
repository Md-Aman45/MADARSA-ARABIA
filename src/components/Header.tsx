import { motion } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', key: 'home' },
    { name: 'About', key: 'about' },
    { name: 'Courses', key: 'programs' },
    { name: 'Our Mission', key: 'resources' },
    { name: 'Notice', key: 'notice' },
    { name: 'Contact', key: 'contact' },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  const handleDonateClick = () => {
    const message = encodeURIComponent("I want to donate for your madarsa please provide me the details where I can donate and earn good deeds");
    window.open(`https://wa.me/918423370548?text=${message}`, '_blank');
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handlePageChange('home')}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ImageWithFallback
              src="/assets/lo.png"
              alt="Madarsa Arabia Logo"
              className="w-13 h-12 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-[#0B0D0E]">
                MADARSA ARABIA
              </h1>
              <p className="text-sm text-[#1F7A53]">TAJVEEDUL QURAN</p>
            </div>
          </motion.div>

          {/* Desktop Navigation and Donate Button */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Button
                    variant={currentPage === item.key ? "default" : "ghost"}
                    onClick={() => handlePageChange(item.key)}
                    className={`relative px-4 py-2 transition-all duration-300 ${
                      currentPage === item.key
                        ? 'bg-[#1F7A53] text-white shadow-lg'
                        : 'text-gray-700 hover:text-[#1F7A53] hover:bg-[#E8F5EF]'
                    }`}
                  >
                    {item.name}
                    {currentPage === item.key && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F7A53]"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </nav>
            
            {/* Donate Now Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                onClick={handleDonateClick}
                className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Donate Now Button for Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="sm"
                onClick={handleDonateClick}
                className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#1F7A53]"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-2">
            {navigation.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Button
                  variant={currentPage === item.key ? "default" : "ghost"}
                  onClick={() => handlePageChange(item.key)}
                  className={`w-full justify-start transition-all duration-300 ${
                    currentPage === item.key
                      ? 'bg-[#1F7A53] text-white'
                      : 'text-gray-700 hover:text-[#1F7A53] hover:bg-[#E8F5EF]'
                  }`}
                >
                  {item.name}
                </Button>
              </motion.div>
            ))}
            {/* Donate Now Button in Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                x: isMenuOpen ? 0 : -20 
              }}
              transition={{ delay: navigation.length * 0.1, duration: 0.3 }}
              className="pt-4"
            >
              <Button
                onClick={handleDonateClick}
                className="w-full bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;