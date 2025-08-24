import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { 
  BookOpen, 
  Users, 
  Award, 
  GraduationCap, 
  Star,
  ArrowRight,
  Calendar,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

interface Stat {
  label: string;
  value: number;
}

interface Department {
  slug: string;
  name: string;
  summary: string;
}

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
}

interface Testimonial {
  name: string;
  program: string;
  content: string;
  rating: number;
}

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-[#1F7A53] mb-2">
      {count}+
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  // Animation controls
  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const departmentsControls = useAnimation();

  // Refs for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const departmentsInView = useInView(departmentsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
  }, [statsInView, statsControls]);

  useEffect(() => {
    if (departmentsInView) {
      departmentsControls.start("visible");
    }
  }, [departmentsInView, departmentsControls]);

  // Local madrasa photos for hero carousel
  const madrasaPhotos = [
     {
      url: "/assets/h1.png",
      title: "Main Academic Building",
      description: "Our state-of-the-art academic facilities"
    },
    {
      url: "/assets/h2.png",
      title: "Student Library",
      description: "Comprehensive collection of Islamic literature"
    },
    {
      url: "/assets/h1.png",
      title: "Main Academic Building",
      description: "Our state-of-the-art academic facilities"
    },
    {
      url: "/assets/h4.png",
      title: "Student Library",
      description: "Comprehensive collection of Islamic literature"
    },
    {
      url: "/assets/h5.png",
      title: "Prayer Hall & Mosque",
      description: "Beautiful mosque for daily prayers and gatherings"
    },
    {
      url: "/assets/h6.png",
      title: "Student Dormitories",
      description: "Comfortable accommodation for students"
    },
    {
      url: "/assets/h7.png",
      title: "Campus Courtyard",
      description: "Peaceful environment for reflection and study"
    },
    {
      url: "/assets/h8.png",
      title: "Classroom Facilities",
      description: "Modern learning environments with traditional values"
    },
    {
      url: "/assets/h2.png",
      title: "Classroom Facilities",
      description: "Modern learning environments with traditional values"
    },{
      url: "/assets/h10.png",
      title: "Classroom Facilities",
      description: "Modern learning environments with traditional values"
    },
    {
      url: "/assets/h11.png",
      title: "Classroom Facilities",
      description: "Modern learning environments with traditional values"
    }
  ];

  useEffect(() => {
    // Load stats data
    const loadStats = async () => {
      try {
        const response = await fetch('/data/stats.json');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          throw new Error('Failed to fetch stats');
        }
      } catch (error) {
        // Fallback data
        setStats([
          { label: "Years of Service", value: 41 },
          { label: "Students", value: 355 },
          { label: "Branches", value: 12 },
          { label: "Faculty", value: 26 }
        ]);
      }
    };

    // Load departments data
    const loadDepartments = async () => {
      try {
        const response = await fetch('/data/departments.json');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data.slice(0, 6));
        } else {
          throw new Error('Failed to fetch departments');
        }
      } catch (error) {
        // Fallback data
        setDepartments([
          { slug: "tajweed", name: "Qur'anic Recitation (Tajweed)", summary: "Mastery of recitation rules and articulation." },
          { slug: "hifz", name: "Hifz Program", summary: "Memorization and revision methodology with mentoring." },
          { slug: "hadith", name: "Hadith Studies", summary: "Foundational texts, methodology, commentary." },
          { slug: "fiqh", name: "Fiqh & Usul", summary: "Jurisprudence principles and application." },
          { slug: "arabic", name: "Arabic Language", summary: "Classical Arabic grammar and literature." },
          { slug: "library", name: "Library Services", summary: "Comprehensive resources and study facilities." }
        ]);
      }
    };

    // Load news data - Extended with more items
    const loadNews = async () => {
      try {
        const response = await fetch('/data/news.json');
        if (response.ok) {
          const data = await response.json();
          setNews(data.slice(0, 6)); // Get more news items
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (error) {
        // Extended fallback data with more items
        setNews([
          { 
            slug: "admissions-open", 
            title: "Admissions Open 2025", 
            date: "2025-05-10", 
            tag: "Announcement", 
            excerpt: "Applications are now open for the new academic year. Early bird discounts available." 
          },
          { 
            slug: "ramadan-schedule", 
            title: "Ramadan Schedule Updates", 
            date: "2025-03-15", 
            tag: "Event", 
            excerpt: "Special prayer times and iftar arrangements for the holy month of Ramadan." 
          },
          { 
            slug: "scholarship-program", 
            title: "Merit Scholarship Program", 
            date: "2025-02-20", 
            tag: "Announcement", 
            excerpt: "New scholarship opportunities for outstanding students in all programs." 
          },
          { 
            slug: "digital-library", 
            title: "Digital Library Expansion", 
            date: "2025-01-30", 
            tag: "Notice", 
            excerpt: "Our digital collection now includes over 5,000 Islamic manuscripts and texts." 
          },
          { 
            slug: "graduation-ceremony", 
            title: "Annual Graduation Ceremony", 
            date: "2024-12-15", 
            tag: "Event", 
            excerpt: "Celebrating the achievements of our graduating class of 2024." 
          },
          { 
            slug: "community-outreach", 
            title: "Community Outreach Program", 
            date: "2024-11-20", 
            tag: "Notice", 
            excerpt: "Students and faculty engaging with local communities through various initiatives." 
          }
        ]);
      }
    };

    loadStats();
    loadDepartments();
    loadNews();
  }, []);

  // Extended testimonials with more content
  const testimonials: Testimonial[] = [
    {
      name: "Ahmad Hassan",
      program: "Hifz Graduate 2023",
      content: "The structured approach and caring teachers helped me complete my Hifz journey successfully. The environment here nurtures both spiritual and academic growth.",
      rating: 5
    },
    {
      name: "Fatima Al-Zahra",
      program: "Arabic Language Student",
      content: "Excellent faculty and comprehensive curriculum. The Arabic program gave me a strong foundation for understanding classical Islamic texts.",
      rating: 5
    },
    {
      name: "Mohammad Ali",
      program: "Tajweed Graduate 2024",
      content: "The Tajweed program transformed my recitation completely. The personal attention from teachers and practice sessions were exceptional.",
      rating: 5
    },
    {
      name: "Aisha Rahman",
      program: "Fiqh Studies 2024",
      content: "The comprehensive approach to Islamic jurisprudence and the practical applications have been invaluable for my understanding.",
      rating: 5
    },
    {
      name: "Omar Abdullah",
      program: "Hadith Studies 2023",
      content: "Learning under renowned scholars has been a privilege. The depth of knowledge and methodology taught here is unmatched.",
      rating: 5
    },
    {
      name: "Maryam Yusuf",
      program: "Quranic Studies 2024",
      content: "The holistic approach to Quranic studies, combining recitation, memorization, and understanding, has enriched my faith immensely.",
      rating: 5
    }
  ];

  const handleDonateClick = () => {
    const message = encodeURIComponent("I want to donate for your madarsa please provide me the details where I can donate and earn good deeds");
    window.open(`https://wa.me/919801213788?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel - IMPROVED */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        initial="hidden"
        animate={heroControls}
        variants={containerVariants}
      >
        {/* Hero Carousel */}
        <div className="absolute inset-0">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active bg-[#1F7A53]',
              bulletClass: 'swiper-pagination-bullet bg-white/50'
            }}
            loop={true}
            className="w-full h-full"
          >
            {madrasaPhotos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Enhanced Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                  
                  {/* Photo Info - Improved positioning */}
                  <motion.div 
                    className="absolute bottom-16 left-8 text-white z-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold mb-2">{photo.title}</h3>
                    <p className="text-lg text-white/90 max-w-md">{photo.description}</p>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Hero Content Overlay - CENTERED LAYOUT */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
            <motion.div 
              className="text-white"
              variants={containerVariants}
            >
              <motion.div 
                className="mb-6"
                variants={itemVariants}
              >
                <Badge variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors duration-300 text-sm md:text-base">
                  Excellence in Islamic Education
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                variants={itemVariants}
              >
               <motion.h1 
  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
  variants={itemVariants}
>
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="block"
  >
    MADARSA {" "}
    <span className="text-[#1F7A53]">
      ARABIA
    </span>
  </motion.span>
  
</motion.h1>
                <motion.span 
                  className="text-[#1E5FA8] block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
               <h2>  TAJVEEDUL QURAN  </h2>
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Join our distinguished institution dedicated to preserving and teaching 
                the sacred knowledge of Islam through traditional and modern methodologies.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                    onClick={() => onPageChange('programs')}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Programs
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-blue text-black  text-[#1E5FA8] transition-all duration-300 text-base"
                    onClick={handleDonateClick}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Donate 
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Counter Section */}
      <motion.section 
        ref={statsRef}
        className="py-16 bg-white"
        initial="hidden"
        animate={statsControls}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <AnimatedCounter value={stat.value} />
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Programs Preview */}
      <motion.section 
        ref={departmentsRef}
        className="py-20 bg-gray-50"
        initial="hidden"
        animate={departmentsControls}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              Our Programs & Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Islamic education across various disciplines, 
              taught by qualified scholars and experienced educators.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {departments.map((dept, index) => (
              <motion.div
                key={dept.slug}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Card className="group h-full border-0 shadow-card hover:shadow-xl transition-all duration-500 hover:bg-gradient-to-tr from-[#EAF2FB] to-[#E8F5EF] cursor-pointer">
                  <CardHeader className="pb-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: 5,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookOpen className="w-6 h-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-[#1F7A53] transition-colors duration-300">
                      {dept.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{dept.summary}</p>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-2 transition-all duration-300"
                      onClick={() => onPageChange('programs')}
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white transition-all duration-300"
                onClick={() => onPageChange('programs')}
              >
                View All Programs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Dar-ul-Ifta Teaser */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-[#1E5FA8] to-[#1F7A53] text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full"
          animate={{
            y: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Dar-ul-Ifta Services
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Get authentic Islamic guidance on contemporary issues from our 
                qualified scholars. Submit your questions and receive scholarly 
                responses based on Quran and Sunnah.
              </p>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors duration-300">
                  Family Matters
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors duration-300">
                  Business & Finance
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors duration-300">
                  Worship & Rituals
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1E5FA8] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onPageChange('resources')}
                >
                  Submit Question
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="/assets/h1.png"
                  alt="Islamic books and manuscripts"
                  className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Latest Notice Carousel */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-end mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                Latest Notice & Announcements
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with our latest announcements and events
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onPageChange('notice')}
              className="hidden sm:flex border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white transition-all duration-300"
            >
              View All Notice
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-[#1F7A53]',
                bulletClass: 'swiper-pagination-bullet bg-gray-300'
              }}
              navigation={{
                prevEl: '.news-prev',
                nextEl: '.news-next',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={news.length >= 6}
              className="pb-12"
            >
              {news.map((item) => (
                <SwiperSlide key={item.slug}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group h-full hover:shadow-xl transition-all duration-500 border-0 shadow-card hover:bg-gradient-to-tr from-[#E8F5EF] to-[#EAF2FB]">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge 
                            variant="outline" 
                            className={`${
                              item.tag === 'Announcement' 
                                ? 'border-[#1F7A53] text-[#1F7A53]'
                                : item.tag === 'Event'
                                ? 'border-[#1E5FA8] text-[#1E5FA8]'
                                : 'border-gray-400 text-gray-600'
                            } group-hover:scale-105 transition-transform duration-300`}
                          >
                            {item.tag}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-[#1F7A53] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{item.excerpt}</p>
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-2 transition-all duration-300"
                          onClick={() => onPageChange('notice')}
                        >
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom navigation buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button className="news-prev w-10 h-10 rounded-full bg-[#1F7A53] text-white flex items-center justify-center hover:bg-[#1F7A53]/90 transition-colors duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="news-next w-10 h-10 rounded-full bg-[#1F7A53] text-white flex items-center justify-center hover:bg-[#1F7A53]/90 transition-colors duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <div className="text-center mt-8 sm:hidden">
            <Button
              variant="outline"
              onClick={() => onPageChange('notice')}
              className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white transition-all duration-300"
            >
              View All Notice
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Carousel */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-[#E8F5EF] via-gray-50 to-[#EAF2FB]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our graduates and current students about their experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-[#1F7A53]',
                bulletClass: 'swiper-pagination-bullet bg-gray-400'
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={testimonials.length >= 6}
              className="pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full border-0 shadow-card hover:shadow-xl transition-all duration-500 bg-white hover:bg-gradient-to-tr from-white to-[#E8F5EF]">
                      <CardContent className="p-6">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                        <div className="border-t pt-4">
                          <p className="font-semibold text-[#0B0D0E]">{testimonial.name}</p>
                          <p className="text-[#1F7A53] text-sm">{testimonial.program}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.section>

      {/* Donation CTA */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Floating elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/80" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Support Islamic Education
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your contribution helps us provide quality Islamic education, 
            maintain our facilities, and support deserving students through scholarships.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                variant="secondary"
                className="bg-white text-[#1F7A53] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleDonateClick}
              >
                Donate Now
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-blue text-white  text-[#1F7A53] transition-all duration-300"
                onClick={() => onPageChange('about')}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;