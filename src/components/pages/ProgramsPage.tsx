import { LazyMotion, domAnimation, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Building,
  CheckCircle,
  Clock,
  GraduationCap,
  Heart,
  Home,
  Users,
  Utensils,
  Wifi
} from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface ProgramsPageProps {
  onPageChange: (page: string) => void;
}

interface Department {
  slug: string;
  name: string;
  summary: string;
  description?: string;
  duration?: string;
  prerequisites?: string;
  facilities?: string[];
}

// WhatsApp Donation Handler
const handleDonateClick = () => {
  const phoneNumber = '918423370548';
  const message = encodeURIComponent("Assalamu Alaikum! I want to donate to your madrasa. Please provide me with the details where I can donate and earn good deeds.");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

// WhatsApp Contact Handler for Program Inquiries
const handleProgramContactClick = (programName: string) => {
  const phoneNumber = '918423370548';
  const message = encodeURIComponent(`Assalamu Alaikum! I'm interested in the ${programName} program at your madrasa. Please provide me with more information.`);
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

// Optimized animation variants - keeping all original animations but with better performance
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

// Fallback data as constant to avoid recreation
const FALLBACK_DEPARTMENTS: Department[] = [
  {
    slug: "tajweed",
    name: "QURAN TAJWEED",
    summary: "Mastery of recitation rules and articulation with proper pronunciation and melody.",
    description: "Our comprehensive Tajweed program focuses on the precise articulation of Qur'anic verses according to classical rules. Students learn proper pronunciation, rhythm, and melody under expert guidance.",
    duration: "2 years",
    prerequisites: "Basic Arabic reading ability"
  },
  {
    slug: "hifz",
    name: "PRIMARY EDUCATION (NAAJRAH)", 
    summary: "Memorization and revision methodology with dedicated mentoring and support.",
    description: "Complete memorization of the Holy Quran with systematic revision techniques. Our experienced teachers provide personalized guidance for each student's memorization journey.",
    duration: "3-5 years",
    prerequisites: "Age 8-16 preferred"
  },
  {
    slug: "hadith",
    name: "DEPARTMENT OF HAFIZ-UL-QURAN",
    summary: "Foundational texts, methodology, and commentary of Prophetic traditions.",
    description: "In-depth study of authentic Hadith collections including Sahih Bukhari, Sahih Muslim, and other classical works. Students learn the science of Hadith and its practical application.",
    duration: "4 years",
    prerequisites: "Intermediate Arabic proficiency"
  },
  {
    slug: "fiqh",
    name: "FIVE YEAR ARABIC COURSE (AALIMIYAT)",
    summary: "Islamic jurisprudence principles and their practical application in daily life.",
    description: "Comprehensive study of Islamic law covering worship, transactions, family matters, and contemporary issues. Students develop skills in legal reasoning and fatwa methodology.",
    duration: "5 years", 
    prerequisites: "Advanced Arabic and basic Islamic studies"
  },
  {
    slug: "arabic",
    name: "COMPUTER SCIENCE & LABS ",
    summary: "Classical Arabic grammar, morphology, and comprehension skills development.",
    description: "Structured program covering Arabic grammar (Nahw), morphology (Sarf), rhetoric (Balagha), and literature. Essential foundation for all Islamic studies.",
    duration: "3 years",
    prerequisites: "Basic literacy"
  },
  {
    slug: "library",
    name: "DEPARTMENT OF ENGLISH",
    summary: "Comprehensive catalog, reading rooms, and research access for scholarly pursuits.",
    description: "State-of-the-art library with over 15,000 books, manuscripts, and digital resources. Quiet study spaces and research assistance available for students and faculty.",
    facilities: ["Reading halls", "Digital archives", "Reference section", "Manuscript collection"]
  },
  {
    slug: "hostel",
    name: "ARABIC LITERATURE",
    summary: "On-campus accommodation with comprehensive student welfare services.",
    description: "Safe and comfortable accommodation for out-of-town students. Includes meals, study halls, recreational facilities, and 24/7 supervision.",
    facilities: ["Dormitory rooms", "Dining hall", "Study rooms", "Recreation area", "Medical care"]
  },
  {
    slug: "mosque",
    name: "DAUR-E-HADITH",
    summary: "Central place of worship hosting congregational prayers and community programs.",
    description: "Beautiful mosque serving as the spiritual center of our campus. Regular congregational prayers, Friday sermons, and special programs throughout the year.",
    facilities: ["Prayer halls", "Ablution areas", "Community hall", "Audio system"]
  },
  {
    slug: "hostel",
    name: "GIRLS EDUCATION",
    summary: "On-campus accommodation with comprehensive student welfare services.",
    description: "Safe and comfortable accommodation for out-of-town students. Includes meals, study halls, recreational facilities, and 24/7 supervision.",
    facilities: ["Dormitory rooms", "Dining hall", "Study rooms", "Recreation area", "Medical care"]
  },
    {
    slug: "arabic",
    name: "MAZLIS-E-TALABA ",
    summary: "Classical Arabic grammar, morphology, and comprehension skills development.",
    description: "Structured program covering Arabic grammar (Nahw), morphology (Sarf), rhetoric (Balagha), and literature. Essential foundation for all Islamic studies.",
    duration: "3 years",
    prerequisites: "Basic literacy"
  },
    {
    slug: "arabic",
    name: "BAZM- SIDDIQ ",
    summary: "Classical Arabic grammar, morphology, and comprehension skills development.",
    description: "Structured program covering Arabic grammar (Nahw), morphology (Sarf), rhetoric (Balagha), and literature. Essential foundation for all Islamic studies.",
    duration: "3 years",
    prerequisites: "Basic literacy"
  },
];

const ICON_MAP: { [key: string]: React.ComponentType<any> } = {
  tajweed: BookOpen,
  hifz: Heart,
  hadith: BookOpen,
  fiqh: GraduationCap,
  arabic: BookOpen,
  library: BookOpen,
  hostel: Home,
  mosque: Building
};

const CATEGORIES = {
  all: 'All Programs',
  academic: 'Academic Programs',
  services: 'Services & Facilities'
};

const SERVICE_SLUGS = new Set(['library', 'hostel', 'mosque']);

// Memoized components for better performance
const ProgramCard = memo(({ 
  dept, 
  onSelect,
  index 
}: { 
  dept: Department; 
  onSelect: (dept: Department) => void;
  index: number;
}) => {
  const IconComponent = ICON_MAP[dept.slug] || BookOpen;
  const isService = SERVICE_SLUGS.has(dept.slug);
  
  const handleClick = useCallback(() => {
    onSelect(dept);
  }, [dept, onSelect]);

  return (
    <motion.div
      key={dept.slug}
      variants={cardVariants}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card 
        className="group h-full cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-tr from-[#EAF2FB] to-[#E8F5EF]"
        onClick={handleClick}
      >
        <CardHeader className="p-6">
          <motion.div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#1F7A53] bg-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="w-8 h-8 text-[#1F7A53]" />
          </motion.div>
          <div className="text-center">
            <CardTitle className="text-2xl font-semibold text-[#0B0D0E] leading-tight mb-4 group-hover:text-[#1F7A53] transition-colors duration-300">
              {dept.name}
            </CardTitle>
            <Badge 
              variant="outline" 
              className={isService ? 'text-[#1E5FA8] border-[#1E5FA8]' : 'text-[#1F7A53] border-[#1F7A53]'}
            >
              {isService ? 'Service' : 'Academic'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 text-base mb-4 line-clamp-3 text-center">{dept.summary}</p>
          
          {dept.duration && (
            <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              {dept.duration}
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="w-full text-green-700 text-base font-medium flex items-center justify-center hover:text-green-800 hover:translate-x-2 transition-all duration-300"
          >
            Learn More <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ProgramCard.displayName = 'ProgramCard';

const ServiceCard = memo(({ 
  service, 
  index 
}: { 
  service: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}) => {
  const IconComponent = service.icon;
  
  return (
    <motion.div
      key={index}
      variants={cardVariants}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
  >
      <Card className="border-0 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-tr from-white to-[#E8F5EF]">
        <CardContent className="p-6">
          <motion.div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#1F7A53] bg-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="w-8 h-8 text-[#1F7A53]" />
          </motion.div>
          <h3 className="text-2xl font-semibold text-[#0B0D0E] mb-4 text-center">{service.title}</h3>
          <p className="text-gray-600 text-base text-center">{service.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const ProgramDetail = memo(({ 
  department, 
  onBack, 
  onPageChange 
}: {
  department: Department;
  onBack: () => void;
  onPageChange: (page: string) => void;
}) => {
  const IconComponent = ICON_MAP[department.slug] || BookOpen;
  
  const handleContactClick = useCallback(() => {
    handleProgramContactClick(department.name);
  }, [department.name]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section 
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#1F7A53] hover:text-[#1F7A53]/80"
            >
              ← Back to Programs
            </Button>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#1F7A53] bg-white"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-8 h-8 text-[#1F7A53]" />
            </motion.div>
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-semibold text-[#0B0D0E] leading-tight mb-2">
                {department.name}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {department.summary}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content */}
      <motion.section 
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-md hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-tr from-[#EAF2FB] to-[#E8F5EF]">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-[#0B0D0E] mb-4">Program Overview</h2>
                <p className="text-gray-600 text-base mb-6">{department.description}</p>

                {department.facilities && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">Facilities Available</h3>
                    <div className="flex flex-col items-center gap-2">
                      {department.facilities.map((facility, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <CheckCircle className="w-5 h-5 text-[#1F7A53] flex-shrink-0" />
                          <span className="text-gray-600">{facility}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {department.duration && (
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {department.duration}
                  </div>
                )}

                {department.prerequisites && (
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {department.prerequisites}
                  </div>
                )}

                <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                  <Users className="w-4 h-4 mr-2" />
                  15-20 students
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full text-green-700 text-base font-medium flex items-center justify-center hover:text-green-800 hover:translate-x-2 transition-all duration-300"
                  onClick={handleContactClick}
                >
                  Contact Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
});

ProgramDetail.displayName = 'ProgramDetail';

const ProgramsPage: React.FC<ProgramsPageProps> = ({ onPageChange }) => {
  const [departments, setDepartments] = useState<Department[]>(FALLBACK_DEPARTMENTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized filtered departments
  const filteredDepartments = useMemo(() => {
    if (selectedCategory === 'all') return departments;
    const isServices = selectedCategory === 'services';
    return departments.filter(dept => SERVICE_SLUGS.has(dept.slug) === isServices);
  }, [departments, selectedCategory]);

  // Memoized callbacks
  const handleDepartmentSelect = useCallback((dept: Department) => {
    setSelectedDepartment(dept);
  }, []);

  const handleBackClick = useCallback(() => {
    setSelectedDepartment(null);
  }, []);

  const handleApplyClick = useCallback(() => {
    onPageChange('contact');
  }, [onPageChange]);

  const handleLearnMoreClick = useCallback(() => {
    onPageChange('about');
  }, [onPageChange]);

  // Fast data loading with preloaded fallback
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        // Faster timeout for quicker fallback
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 800);
        
        const response = await fetch('/data/departments.json', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.log('Using fallback data for better performance');
      } finally {
        // Quick loading transition
        setTimeout(() => setIsLoading(false), 50);
      }
    };

    loadDepartments();
  }, []);

  // Minimal loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <motion.div 
            className="w-12 h-12 border-4 border-[#1F7A53] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  if (selectedDepartment) {
    return (
      <ProgramDetail 
        department={selectedDepartment}
        onBack={handleBackClick}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
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
              Programs & Courses
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Comprehensive Islamic education across various disciplines, 
              designed to nurture knowledge, character, and spiritual growth.
            </motion.p>
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <motion.section 
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <motion.div variants={itemVariants}>
                <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
                  {Object.entries(CATEGORIES).map(([key, label]) => (
                    <TabsTrigger key={key} value={key} className="text-sm">
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDepartments.map((dept, index) => (
                  <ProgramCard
                    key={dept.slug}
                    dept={dept}
                    onSelect={handleDepartmentSelect}
                    index={index}
                  />
                ))}
              </motion.div>
            </Tabs>
          </div>
        </motion.section>

        {/* Additional Services Info */}
        <motion.section 
          className="py-20 bg-gray-50"
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
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
                Supporting Your Educational Journey
              </h2>
              <p className="text-xl text-gray-600">
                Beyond academics, we provide comprehensive support services
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24"
              variants={containerVariants}
            >
              {[
                {
                  icon: Wifi,
                  title: "Digital Resources",
                  description: "Access to online library, digital manuscripts, and e-learning platforms for enhanced learning experience.",
                  color: "#1F7A53"
                },
                {
                  icon: Utensils,
                  title: "Dining Services", 
                  description: "Nutritious halal meals served in our dining hall, with special arrangements for dietary requirements.",
                  color: "#1E5FA8"
                },
                {
                  icon: Heart,
                  title: "Student Welfare",
                  description: "Comprehensive student support including counseling, medical care, and guidance for development.",
                  color: "#1F7A53"
                }
              ].map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section with animated background */}
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
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Begin Your Journey?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join our community of scholars and embark on a transformative educational experience 
              rooted in Islamic tradition and contemporary understanding.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1F7A53] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleApplyClick}
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue text-white bg-white text-[#1F7A53] transition-all duration-300"
                  onClick={handleDonateClick}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Donate
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
};

export default ProgramsPage;