import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Target,
  Eye,
  History,
  Users,
  Award,
  BookOpen,
  Building,
  Globe,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  scale: 1.03,
  transition: { duration: 0.3, ease: "easeOut" }
};

const rotateOnHover = {
  rotate: 5,
  scale: 1.1,
  transition: { duration: 0.3 }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

const AboutPage: React.FC<AboutPageProps> = ({ onPageChange }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current || !isPlaying) return;

    const gallery = galleryRef.current;
    let scrollPos = 0;
    const itemWidth = 320 + 16; // w-80 (320px) + gap-4 (16px)
    const totalItems = gallery.children.length / 2;
    let direction = 1; // 1 for right, -1 for left

    const scrollInterval = setInterval(() => {
      if (!gallery) return;
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;

      if (direction === 1) {
        if (gallery.scrollLeft >= maxScroll) {
          direction = -1;
        } else {
          gallery.scrollLeft += 1;
        }
      } else {
        if (gallery.scrollLeft <= 0) {
          direction = 1;
        } else {
          gallery.scrollLeft -= 1;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [isPlaying]);

  const handleStartTour = () => {
    window.open('https://maps.app.goo.gl/a4mLk2aSqVi9q7Uq5', '_blank');
  };

  const timeline = [
    {
      year: '1999',
      title: 'Foundation',
      description: 'Established with a vision to provide authentic Islamic education'
    },
    {
      year: '2005',
      title: 'Library Expansion',
      description: 'Added comprehensive library with 5,000+ books and manuscripts'
    },
    {
      year: '2010',
      title: 'Hostel Facility',
      description: 'Opened student hostel to accommodate out-of-town students'
    },
    {
      year: '2015',
      title: 'Dar-ul-Ifta Launch',
      description: 'Started Fatwa services to serve the wider Muslim community'
    },
    {
      year: '2020',
      title: 'Digital Initiative',
      description: 'Launched online learning platform and digital resources'
    },
    {
      year: '2024',
      title: '25 Years of Service',
      description: 'Celebrating a quarter-century of educational excellence'
    }
  ];

  const leadership = [
    {
      name: 'Maulana Abdul Rahman Al-Hakeem',
      position: 'Principal & Chief Scholar',
      qualification: 'PhD in Islamic Studies, Al-Azhar University',
      experience: '30+ years in Islamic education',
      specialization: 'Quranic Studies & Hadith'
    },
    {
      name: 'Dr. Muhammad Yusuf Qadri',
      position: 'Vice Principal',
      qualification: 'MA Islamic Law, Jamia Millia Islamia',
      experience: '25+ years in academia',
      specialization: 'Islamic Jurisprudence & Fatwa'
    },
    {
      name: 'Qari Hafiz Ahmad Nazir',
      position: 'Head of Qiraat Department',
      qualification: 'Ijazah in 10 Qiraat',
      experience: '20+ years teaching Tajweed',
      specialization: 'Quranic Recitation & Memorization'
    },
    {
      name: 'Ustadh Ibrahim Al-Baghdadi',
      position: 'Head of Arabic Department',
      qualification: 'MA Arabic Literature, Baghdad University',
      experience: '18+ years in language instruction',
      specialization: 'Classical Arabic & Grammar'
    }
  ];

  const affiliations = [
    'Wifaq-ul-Madaris Al-Arabiyyah',
    'Dar-ul-Uloom Deoband Alumni Network',
    'International Islamic Education Council',
    'Association of Islamic Schools & Colleges'
  ];

  const facilities = [
    { name: 'Modern Classrooms', description: '20 well-equipped classrooms with audio-visual facilities' },
    { name: 'Comprehensive Library', description: '15,000+ books, manuscripts, and digital resources' },
    { name: 'Student Hostel', description: 'Accommodation for 200+ students with dining facilities' },
    { name: 'Campus Mosque', description: 'Beautiful mosque accommodating 500+ worshippers' },
    { name: 'Computer Lab', description: 'Modern IT facilities for digital learning' },
    { name: 'Medical Facility', description: 'On-campus clinic with qualified medical staff' }
  ];

  const galleryImages = [
    '/assets/p00.png',
    '/assets/h1.png',
    '/assets/h2.png',
    '/assets/h6.png',
    '/assets/h4.png',
    '/assets/h5.png',
    '/assets/h1.png',
    '/assets/h11.png',
    '/assets/h10.png',
    '/assets/h8.png'
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              animate={pulseAnimation}
              className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
            >
              About Our Institution
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Committed to excellence in Islamic education, spiritual development,
              and community service for over 25 years.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeIn}>
              <motion.div whileHover={scaleOnHover}>
                <Card className="border-0 shadow-card bg-gradient-to-br from-[#E8F5EF] to-white">
                  <CardHeader className="text-center pb-6">
                    <motion.div whileHover={rotateOnHover} className="w-16 h-16 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-[#1F7A53]">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      To provide authentic Islamic education rooted in the Quran and Sunnah,
                      fostering scholarly excellence, spiritual development, and moral character.
                      We aim to prepare knowledgeable and righteous individuals who can serve
                      their communities with wisdom and dedication.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <motion.div whileHover={scaleOnHover}>
                <Card className="border-0 shadow-card bg-gradient-to-br from-[#EAF2FB] to-white">
                  <CardHeader className="text-center pb-6">
                    <motion.div whileHover={rotateOnHover} className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-[#1E5FA8]">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      To be a leading center of Islamic learning that combines traditional
                      scholarship with contemporary understanding, producing graduates who
                      are well-versed in Islamic sciences and capable of addressing modern
                      challenges while preserving authentic Islamic values.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Team */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              Leadership & Administration
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              Experienced scholars and educators leading our institution
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div key={index} variants={fadeIn}>
                <motion.div whileHover={scaleOnHover}>
                  <Card className="border-0 shadow-card text-center">
                    <CardHeader className="pb-4">
                      <motion.div whileHover={rotateOnHover} className="w-20 h-20 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </motion.div>
                      <CardTitle className="text-lg">{leader.name}</CardTitle>
                      <p className="text-[#1F7A53] font-medium">{leader.position}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Qualification:</strong> {leader.qualification}</p>
                        <p><strong>Experience:</strong> {leader.experience}</p>
                        <p><strong>Specialization:</strong> {leader.specialization}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Campus & Facilities */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-6">
                Campus & Facilities
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our modern campus provides an ideal environment for learning,
                worship, and community life, equipped with state-of-the-art facilities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                    className="flex items-start space-x-3 p-4 rounded-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-[#1F7A53] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0D0E] mb-1">
                        {facility.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{facility.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src="/assets/h4.png"
                alt="Modern Islamic campus"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-2">Visit Our Madarsa</h3>
                <p className="text-white/90">Explore our Madarsa facilities </p>
                <Button 
                  className="mt-4 bg-white text-[#1F7A53] hover:bg-white/90"
                  onClick={handleStartTour}
                >
                  Start Tour
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Affiliations & Accreditations */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              Affiliations & Recognition
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              Proud member of prestigious Islamic educational organizations
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {affiliations.map((affiliation, index) => (
              <motion.div key={index} variants={fadeIn}>
                <motion.div whileHover={scaleOnHover}>
                  <Card className="border-0 shadow-card">
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0B0D0E]">{affiliation}</h3>
                        <p className="text-gray-600 text-sm">Affiliated Institution</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 ml-auto" />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gallery Strip with Auto Scroll */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4 mr-4">Campus Life</h2>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="sm"
              variant="outline"
              className="mb-4"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          <div
            ref={galleryRef}
            className="flex overflow-x-hidden gap-4 py-4 cursor-grab active:cursor-grabbing"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="flex-shrink-0 w-80 h-48 rounded-xl overflow-hidden shadow-lg"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Campus life ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
            
            {/* Duplicate images for seamless looping */}
            {galleryImages.map((image, index) => (
              <motion.div
                key={`dup-${index}`}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="flex-shrink-0 w-80 h-48 rounded-xl overflow-hidden shadow-lg"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Campus life ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Brochure Download CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div animate={pulseAnimation}>
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-white/80" />
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Download Our Brochure
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get detailed information about our programs, facilities, admission procedures,
            and everything you need to know about joining our institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#1F7A53] hover:bg-white/90"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#1F7A53] hover:bg-white/90"
                onClick={() => onPageChange('contact')}
              >
                Contact Admissions
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;