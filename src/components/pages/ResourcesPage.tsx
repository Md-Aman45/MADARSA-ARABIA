import { LazyMotion, domAnimation, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Building,
  Globe,
  Heart,
  Star,
  Target,
  Users,
  Hammer
} from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Define the component's props interface.
interface MissionVisionPageProps {
  // Optional prop for handling page changes, useful for parent components.
  onPageChange?: (page: string) => void;
}

// WhatsApp Donation Handler
const handleDonateClick = () => {
  const phoneNumber = '918423370548';
  const message = encodeURIComponent("Assalamu Alaikum! I want to donate to your madrasa. Please provide me with the details where I can donate and earn good deeds.");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

// WhatsApp Donation for Construction Project
const handleDonateProject = () => {
  const phoneNumber = '9155649575';
  const message = encodeURIComponent("Assalamu Alaikum! I am interested in donating to the ongoing construction project. Please provide me with the details.");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

// Optimized animation variants
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

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const rotateVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const ResourcesPage: React.FC<MissionVisionPageProps> = ({ onPageChange }) => {
  // Handles the click event for the "Join Us" button.
  const handleJoinUs = useCallback(() => {
    if (onPageChange) {
      onPageChange('contact');
    }
  }, [onPageChange]);

  // Data for the core goals section.
  const coreGoals = useMemo(() => [
    {
      title: "Producing Huffaz of the Qur'an",
      description: "Preparing over 500 future Huffaz, preserving and living the sacred words of Allah.",
      icon: BookOpen
    },
    {
      title: "Making Qur'an Simple & Accessible",
      description: "Making the Qur'an easy to understand for all ages through structured learning.",
      icon: BookOpen
    },
    {
      title: "Promoting the Arabic Language",
      description: "Strengthening Arabic literacy to understand Qur'an and Hadith directly.",
      icon: Globe
    },
    {
      title: "Strengthening Urdu & Mother Tongue",
      description: "Preserving cultural and linguistic identity alongside religious values.",
      icon: Users
    },
    {
      title: "Building a Trustworthy Institution",
      description: "Becoming a center of authentic Islamic education known for professionalism and sincerity.",
      icon: Building
    }
  ], []);

  // Data for the quick stats section.
  const stats = useMemo(() => [
    { label: "Huffaz Under Training", value: "500+" },
    { label: "Qualified Teachers", value: "50+" },
    { label: "Students Benefited", value: "1000+" },
    { label: "Programs", value: "10+" }
  ], []);

  // Data for the ongoing construction section
  const constructionImages = useMemo(() => [
    {
      src: "/assets/c2.jpg",
      subheading: "Phase 1: Foundation",
      details: "Undergoing construction of main gate and Hazrat Abu bakr Siddiq (R.A) hostel"
    },
    {
      src: "/assets/c1.jpg",
      subheading: "Phase 2: Main Building",
      details: "Undergoing construction of main gate and Hazrat Abu bakr Siddiq (R.A) hostel."
    },
    {
      src: "/assets/c3.jpg",
      subheading: "Phase 3: Classrooms",
      details: "The Guest house and Nursing home is to be built here at the back of Madarsa. it's also in stay for very long time"
    },
    {
      src: "/assets/c4.jpg",
      subheading: "Phase 4: Library & Hall",
      details: "The framework for our new library and assembly hall is in progress."
    },
    {
      src: "/assets/c5.jpg",
      subheading: "Phase 5: Student Hostel",
      details: "Work has begun on the new student accommodation facilities."
    },
    {
      src: "/assets/c7.jpg",
      subheading: "Phase 6: Campus Mosque",
      details: "It is the land where Madarsa is going to built their very important project For their students so they also get more good facilities "
    }
  ], []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Main container with a minimum height and consistent background color. */}
      <div className="min-h-screen bg-white font-sans">
        {/* Hero Section: A large, eye-catching banner with a gradient background. */}
        <motion.section
          className="relative bg-gradient-to-br from-[#1F7A53] via-[#1e6b48] to-[#1a5d40] py-20 lg:py-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative, semi-transparent circular elements for visual interest. */}
          <motion.div
            className="absolute inset-0 opacity-10"
            variants={rotateVariants}
            initial="initial"
            animate="animate"
          >
            <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/20 rounded-full"></div>
          </motion.div>

          {/* Content of the hero section, centered and styled. */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Our Mission & Vision
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Nurturing Faith, Knowledge, and Service Through the Qur'an and Sunnah
            </motion.p>
          </div>
        </motion.section>

        {/* Mission Section: A two-column layout for text and a quote card. */}
        <motion.section
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mission statement content */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-12 h-12 bg-[#1F7A53] rounded-lg flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E]">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Maulana Siddiq Ahmad Sahab’s vision for developing this madrasa was to make Islamic education simple and accessible, instill confidence in children, and nurture them with Quranic knowledge, Islamic values, and moral strength so they could live as proud, disciplined, and faithful Muslims while contributing positively to society.
                </p>

                {/* Three-column grid for key mission values. */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <motion.div
                      className="w-16 h-16 bg-[#F1F5F9] rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookOpen className="w-8 h-8 text-[#1F7A53]" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-700">Qur'an Based</p>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <motion.div
                      className="w-16 h-16 bg-[#F1F5F9] rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-8 h-8 text-[#1F7A53]" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-700">Character Building</p>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <motion.div
                      className="w-16 h-16 bg-[#F1F5F9] rounded-lg flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Building className="w-8 h-8 text-[#1F7A53]" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-700">Modern Excellence</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quranic quote card. */}
              <motion.div variants={itemVariants} className="relative">
                <Card className="rounded-2xl p-8 lg:p-12 h-full flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="text-center">
                    <motion.div
                      className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="w-12 h-12 text-[#1F7A53]" />
                    </motion.div>
                    <blockquote className="text-xl font-semibold text-[#0B0D0E] mb-4 italic">
                      "And We made from them leaders guiding by Our command when they were patient
                      and were certain of Our signs."
                    </blockquote>
                    <cite className="text-[#1F7A53] font-medium">Quran 32:24</cite>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Core Goals Section: A grid of cards describing the goals. */}
        <motion.section
          className="py-20 bg-[#F9FAFB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                Our Core Goals
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Five fundamental objectives that guide our educational mission and shape the future of Islamic learning
              </p>
            </motion.div>

            {/* Grid for the core goal cards. */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {coreGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col">
                      {/* Card content with left alignment for icons and text. */}
                      <CardContent className="p-6 flex flex-col items-start text-left">
                        <motion.div
                          className="w-14 h-14 bg-[#1F7A53] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl font-bold text-[#0B0D0E] leading-tight mb-2">
                          {goal.title}
                        </CardTitle>
                        <p className="text-gray-700 leading-relaxed flex-grow">{goal.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* New On-Going Construction Section */}
        <motion.section
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#1e5fa8] rounded-full flex items-center justify-center">
                  <Hammer className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                On-Going Construction
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
                Witness our vision taking shape. Your support is building the future of our institution.
              </motion.p>
            </div>
            
            {/* Grid for construction images */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {constructionImages.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-t-xl h-64">
                      <ImageWithFallback
                        src={project.src}
                        alt={project.subheading}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col items-start">
                      <CardTitle className="text-xl font-bold text-[#0B0D0E] mb-2">
                        {project.subheading}
                      </CardTitle>
                      <p className="text-gray-700 leading-relaxed">{project.details}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Donate button */}
<motion.div
  className="text-center mt-12"
  variants={itemVariants}
>
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <Button
      onClick={handleDonateProject}
      className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white text-lg px-10 py-6 font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#1F7A53]/50 transition-all duration-300"
    >
      <Heart className="w-5 h-5 mr-2" />
      Donate for the Project
    </Button>
  </motion.div>
</motion.div>
          </div>
        </motion.section>

        {/* Stats Section: Displays key metrics in a simple grid. */}
        <motion.section
          className="py-20 bg-[#1F7A53]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Quick Stats
              </h2>
              <p className="text-xl text-white/90">
                Measuring our progress in serving the community
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section: Encourages students and community support. */}
        <motion.section
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <motion.div
                className="w-24 h-24 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                Join Us
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Be part of our mission to nurture the next generation of knowledgeable,
                righteous Muslims who will serve as beacons of light in their communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Student & Families Card */}
              <motion.div variants={cardVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="w-10 h-10 text-[#1F7A53] mx-auto mb-4"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Users className="w-full h-full" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#0B0D0E] mb-2">Students & Families</h3>
                    <p className="text-gray-600 mb-4">
                      Enroll in our programs and become part of a community dedicated to Islamic excellence.
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleJoinUs}
                        className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white w-full"
                      >
                        Apply for Admission
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Community Support Card */}
              <motion.div variants={cardVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="w-10 h-10 text-[#1e5fa8] mx-auto mb-4"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Building className="w-full h-full" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#0B0D0E] mb-2">Community Support</h3>
                    <p className="text-gray-600 mb-4">
                      Support our mission through donations, volunteering, or spreading awareness.
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleDonateClick}
                        className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white w-full"
                      >
                        Support Our Mission
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.p
              className="text-gray-600 italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              "And whoever saves a life, it is as if he has saved all of mankind" - Quran 5:32
            </motion.p>
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
};

export default ResourcesPage;