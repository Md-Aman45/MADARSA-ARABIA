import React from 'react';
import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Heart,
    Mail,
    MapPin,
    Phone,
    Users
} from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
    onPageChange: (page: string) => void;
}

// WhatsApp Donation Handler
const handleDonateClick = () => {
    const phoneNumber = '918423370548';
    const message = encodeURIComponent("Assalamu Alaikum! I want to donate to your madrasa. Please provide me with the details where I can donate and earn good deeds.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const { t } = useLanguage();
    const quickLinks = [
        { name: t('nav.home'), key: 'home' },
        { name: t('nav.about'), key: 'about' },
        { name: t('nav.programs'), key: 'programs' },
        { name: t('nav.resources'), key: 'resources' },
        { name: t('nav.notice'), key: 'notice' },
        { name: t('nav.contact'), key: 'contact' },
    ];

    const programs = [
        t('footer.programs.tajweed') || 'QURAN TAJWEED',
        t('footer.programs.primary') || 'PRIMARY EDUCATION (NAAJRAH)',
        t('footer.programs.arabic') || 'FIVE YEAR ARABIC COURSE (AALIMIYAT)',
        t('footer.programs.computer') || 'DEPARTMENT OF COMPUTER SCIENCE',
        t('footer.programs.english') || 'DEPARTMENT OF ENGLISH',
        t('footer.programs.literature') || 'ARABIC LITERATURE'
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
                            {/* Removed background color and rounded-lg from here */}
                            {/* Updated size to w-16 h-16 for a larger space */}
                            <motion.div
                                className="w-16 h-16 flex items-center justify-center"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Updated image size to be larger */}
                                <ImageWithFallback
                                    src="/assets/lo.png"
                                    alt="Madarsa Arabia Logo"
                                    className="w-16 h-16 object-contain"
                                />
                            </motion.div>
                            <div>
                                <h3 className="text-xl font-bold">{t('hero.title') || "MADARSA ARABIA"}</h3>
                                <p className="text-[#1F7A53] text-sm">{t('hero.tagline') || "TAJVEEDUL QURAN"}</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {t('footer.aboutText') || "Dedicated to preserving and teaching the sacred knowledge of Islam through traditional and modern methodologies since 1404 Hijri./ 1984 Yr."}
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
                        <h3 className="text-xl font-semibold mb-6 text-white">{t('footer.quickLinks') || "Quick Links"}</h3>
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
                        <h3 className="text-xl font-semibold mb-6 text-white">{t('footer.ourPrograms') || "Our Programs"}</h3>
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
                        <h3 className="text-xl font-semibold mb-6 text-white">{t('footer.contactInfo') || "Contact Info"}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-[#1F7A53] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 text-sm">
                                        MASAUNI, POST OFFICE KALINJAR,<br />
                                        TEHSIL NARAINI, DISTRICT BANDA (UP)<br />
                                        PINCODE-210129
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-[#1E5FA8] flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 text-sm">+91 9452463669</p>
                                    <p className="text-gray-300 text-sm">+91 7880927738</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-[#1F7A53] flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 text-sm">info@madarsa-arabia.edu</p>
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
                                © {new Date().getFullYear()} {t('footer.rightsReserved') || "Madarsa Arabia Tajveedul Quran. All rights reserved."}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                {t('footer.aboutText')?.split('.')[0] || "Preserving Islamic knowledge through traditional and modern education."}.
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
                                    onClick={handleDonateClick}
                                    className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
                                >
                                    <Heart className="w-4 h-4 mr-2" />
                                    {t('common.donateNow') || "Donate"}
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange('contact')}
                                    className="border-[#1E5FA8] text-[#1E5FA8] hover:bg-[#1E5FA8] hover:text-white"
                                >
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    {t('footer.applyNow') || "Apply Now"}
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