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
  Pause,
  BookText,
  Home,
  Heart,
  Lightbulb,
  GraduationCap
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
    '/assets/m1.png',
    '/assets/m3.png',
    '/assets/m2.png',
    '/assets/m1.png',
    '/assets/h4.png',
    '/assets/h5.png',
    '/assets/h1.png',
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

      {/* Our Journey Section with Updated UI */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              Our Journey & Legacy
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              A rich history of spreading knowledge, rooted in the dedication of our founders.
            </motion.p>
          </div>

          <motion.div variants={fadeIn} className="text-gray-700 text-lg leading-relaxed text-justify space-y-6">
            <h3 className="text-2xl font-bold text-[#1F7A53] mb-4 text-center">Madrasah Arabia Tajweed-ul-Qur’an</h3>
            <p className="text-center">
              <strong>Establishment:</strong> 1404 Hijri. / 1984 Yr.
            </p>
            <p className="text-center">
              <strong>Elders/Patrons:</strong> Hazrat Maulana Qari Sayyed Siddiq Ahmad Sahab Bandvi (rahimahullah) and Hazrat Maulana Mufti Mahmudul Hasan Sahab Deobandi (rahimahullah).
            </p>
            <p className="text-center">
              <strong>Founder:</strong> Hazrat Maulana Siddiq Ahmad Sahab (rahimahullah).
            </p>

            <p className="mt-8">
              Madrasa Arabia Tajweedul Qur’an is situated in Masauni, post office Kalinjar, tehsil Naraini, District BANDA (UP). This area of Masauni, surrounded by hills and a very famous heritage site (Kalinjar Fort), was considered backward in terms of religion, education, and morality. The great scholar of Islam, Hazrat Allama, Faqih-e-Millat, Hazrat Maulana Sayyed Qari Siddiq Ahmad Sahab Bandvi (rahimahullah), along with Mufti Mahmudul Hasan Sahab Deobandi (rahimahullah), and his student and a founder of this madrasa, Hazrat Maulana Sayyed Siddiq Ahmad Masaunvi (rahimahullah), established this madrasa in 1984 (1404 Hijri).
            </p>

            <p>
              Hazrat Maulana Sayyed Siddiq Ahmad Masaunvi (rahimahullah) was deeply devoted to Islam and had a strong desire to revive the Sunnah. He initiated this madrasa in the courtyard of his own house, aiming to provide a sacred place where the children of Muslims could learn the recitation of the Holy Qur’an with proper **tajweed** (rules of pronunciation). With the cooperation of local people and generous support from devoted Muslims, this sacred institution came into existence. After him, the responsibility of handling the madrasa was handed over to the current principal, **Hazrat Maulana Sayyed Abdul Tawwab Sahab**. Since then, under the supervision of noble and sincere personalities, the madrasa has been continuously progressing. By the grace of Allah, it stands as a remarkable example of religious and educational development for the locality and surrounding areas.
            </p>

            <p>
              The madrasa is engaged in its noble mission with sincerity and determination. At present, it has **26 teachers** and about **515 students**, along with **13 branches** in its surrounding areas whose expenses are also maintained by the madrasa only. In addition to religious education, arrangements for modern and academic studies are also provided. The expenses of this madrasa are borne entirely by the generosity of Muslims, as it does not have any permanent source of income.
            </p>

            <p>
              Currently, about 515 students are receiving education here. Each year, nearly 80–100 students complete the Nazira Qur’an (recitation with tajweed). Along with this, the madrasa provides a department of **Hifz** and a department of **Aalimiyat**. All these courses are maintained through the curriculum of **Darul Uloom Nadwa, Lucknow**. The madrasa also contains multiple departments and courses that help students shine in the future like a diamond. These children then become a source of happiness for their parents and a means of continuous reward for the founders of the madrasa.
            </p>
          </motion.div>

          {/* New Section for Girls' Madrasa */}
          <motion.div
            variants={fadeIn}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#EAF2FB] to-white shadow-card"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E5FA8] text-center">Jamia-Fatima-Al-Zehra-Lil Banaat (Girls' Section)</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed text-justify mb-4">
              Madrasa Arabia Tajweedul Qur'an is also running an Islamic institution for girls, which is currently being managed in a small house with a total of **90 local students**. Due to the high demand for girls' education, the madrasa is unable to meet its expenses and cannot provide them with proper comfort. Although the educational facilities are good, there is no proper building or necessary resources for the girls’ studies. By the grace of Allah and through your prayers, land for the madrasa has already been arranged. Now, only the construction of the building and other requirements remain, for which we need your wishes and your presence in this project.
            </p>
          </motion.div>

        </div>
      </motion.section>

      {/* --- Our founder Section (EXISTING) --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Circular Image on the Left */}
          <motion.div
            variants={fadeIn}
            className="flex justify-center"
          >
            <div className="w-64 h-64 rounded overflow-hidden shadow-xl border-4 border-white">
              <ImageWithFallback
                src="/assets/principle.png"
                alt="Our Principle"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Our Founder Section on the Right */}
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4">Founder</h2>
            <h1>Words from Our Founder</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Message of founder

              DEAR MUSLIM BROTHERS

              It is with pride and privilege that I present the following introduction to the services provided by Madrasa Arabia tajveedul Quran, located in,Village Masauni , post office kalinjar, tehsil Naraini, District BANDA (UP) 210129.INDIA
              <br /><br />
              In 1984, I was deeply shocked to witness the emergence of Muslim conversions in my village and surrounding areas where a few Muslims had already renounced Islam.
              <br /><br />
              I realized that this situation was due to the absence of a Madrasa in this village that could provide Islamic teachings to those in need.

              For Me, education was never limited to literacy alone; it was a means of building character, nurturing the soul, and preparing future generations to walk upon the path shown by Allah ﷻ and His beloved Messenger Prophet Muhammad ﷺ. He firmly believed in the words of the Prophet ﷺ:
              "The seeking of knowledge is obligatory upon every Muslim (male and female)."
              This teaching inspired me to establish an institution where children could learn not only how to read and write, but also how to embody Islamic values such as honesty, compassion, humility, and respect.
              <br /><br />
              Whatever time I could spare, I dedicated that time to teach the students. This situation persisted for several days until Allah’s blessings eased our circumstances. Generous individuals donated land, and construction began. As a result, parents started sending their children to the Madrasa.
              <br /><br />
              Initially, we constructed a few rooms with earthen walls and Khaprail roofs. Students from outside began residing there. Over time, with the students’ assistance, construction continued, and our teaching classes remained steady. Despite facing significant challenges, the students persevered with unwavering courage.
              <br /><br />
              The dedication and resilience of the teaching staff, who persevered despite limited resources and hardships, deserve commendation. May Allah grant them abundant blessings in return. (Ameen)
              May this endeavor thrive and may Allah alleviate their hardships. (Ameen)
              <br /><br />
              Hazrat Maulana Sayyed Siddique Ahmad Masaunvi (R.A),
              Founder, MADARSA ARABIA TAJVEEDUL QURAN MASAUNI
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* New Section: Nazim's Message (Requested Layout) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-start gap-10">
            {/* Image on the right (top corner) */}
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 flex justify-end"
            >
              <div className="w-full h-auto overflow-hidden rounded-lg shadow-xl">
                <ImageWithFallback
                  src="/assets/pr.jpg" // You can replace this with a different image if you have one
                  alt="Nazim Maulana Abdul Tawab Sahab"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Heading and text on the left */}
            <motion.div variants={fadeIn} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4">
                Nazim's Message
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                It is with deep reverence that we inform all friends and concerned individuals that Hazrat Maulana Sayyed Siddiq Ahmad Masaunvi (R.A), the esteemed founder of Madarsa Arabia Tajweedul Quran Masauni, passed away on June 6th, 2013 (1418 Hijri).
                <br /><br />
                Despite my own reluctance and Maulana’s own reservations, I was entrusted with the responsibility of continuing the legacy of Madarsa Arabia after his passing. Alhamdulillah, over the past twelve years, we have navigated this journey with the grace of the founder, the guidance of our revered elders, and the unwavering support of well-wishers. Their cooperation has allowed me to carry forward the work initiated by my father, bringing a sense of fulfillment.
                <br /><br />
                Beyond the confines of Madarsa, we strive to meet the religious and cultural needs of our community consistently.
                <br /><br />
                Introducing Madarsa Arabia Tajweedul Quran Masauni: A Glimpse
                <br /><br />
                To provide an introduction of Madarsa Arabia, we have created an introductory website. This platform includes essential information, images, and a fervent appeal made by my father in 1984. We hope it proves valuable to all our well-wishers.
                <br /><br />
                I earnestly invite everyone to visit Madarsa Arabia Tajweedul Quran Masauni in person, gaining firsthand knowledge of our institution. Your presence will be a source of encouragement for us.
                <br /><br />
                May Allah bless us all.
                <br /><br />
                NAZIM.
                <br />
                MAULANA ABDUL TAWWAB SAHAB
                <br />
                MADARSA ARABIA TAJVEEDUL QURAN MASAUNI.
              </p>
            </motion.div>
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
                        <h3 className="font-semibold text-[#0B0B0E]">{affiliation}</h3>
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
                className={`flex-shrink-0 rounded-xl overflow-hidden shadow-lg w-80 h-48`}
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
                className={`flex-shrink-0 rounded-xl overflow-hidden shadow-lg w-80 h-48`}
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