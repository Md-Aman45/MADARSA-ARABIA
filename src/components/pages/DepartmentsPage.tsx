import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  BookOpen, 
  Clock, 
  Users, 
  GraduationCap,
  Building,
  Heart,
  Wifi,
  Utensils,
  ArrowRight,
  CheckCircle,
  Home
} from 'lucide-react';

interface DepartmentsPageProps {
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

const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ onPageChange }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await fetch('/data/departments.json');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          throw new Error('Failed to fetch departments');
        }
      } catch (error) {
        // Fallback data
        setDepartments([
          {
            slug: "tajweed",
            name: "Qur'anic Recitation (Tajweed)",
            summary: "Mastery of recitation rules and articulation with proper pronunciation and melody.",
            description: "Our comprehensive Tajweed program focuses on the precise articulation of Qur'anic verses according to classical rules. Students learn proper pronunciation, rhythm, and melody under expert guidance.",
            duration: "2 years",
            prerequisites: "Basic Arabic reading ability"
          },
          {
            slug: "hifz",
            name: "Hifz Program", 
            summary: "Memorization and revision methodology with dedicated mentoring and support.",
            description: "Complete memorization of the Holy Quran with systematic revision techniques. Our experienced teachers provide personalized guidance for each student's memorization journey.",
            duration: "3-5 years",
            prerequisites: "Age 8-16 preferred"
          },
          {
            slug: "hadith",
            name: "Hadith Studies",
            summary: "Foundational texts, methodology, and commentary of Prophetic traditions.",
            description: "In-depth study of authentic Hadith collections including Sahih Bukhari, Sahih Muslim, and other classical works. Students learn the science of Hadith and its practical application.",
            duration: "4 years",
            prerequisites: "Intermediate Arabic proficiency"
          },
          {
            slug: "fiqh",
            name: "Fiqh & Usul",
            summary: "Islamic jurisprudence principles and their practical application in daily life.",
            description: "Comprehensive study of Islamic law covering worship, transactions, family matters, and contemporary issues. Students develop skills in legal reasoning and fatwa methodology.",
            duration: "5 years", 
            prerequisites: "Advanced Arabic and basic Islamic studies"
          },
          {
            slug: "arabic",
            name: "Arabic Language",
            summary: "Classical Arabic grammar, morphology, and comprehension skills development.",
            description: "Structured program covering Arabic grammar (Nahw), morphology (Sarf), rhetoric (Balagha), and literature. Essential foundation for all Islamic studies.",
            duration: "3 years",
            prerequisites: "Basic literacy"
          },
          {
            slug: "library",
            name: "Library Services",
            summary: "Comprehensive catalog, reading rooms, and research access for scholarly pursuits.",
            description: "State-of-the-art library with over 15,000 books, manuscripts, and digital resources. Quiet study spaces and research assistance available for students and faculty.",
            facilities: ["Reading halls", "Digital archives", "Reference section", "Manuscript collection"]
          },
          {
            slug: "hostel",
            name: "Student Hostel",
            summary: "On-campus accommodation with comprehensive student welfare services.",
            description: "Safe and comfortable accommodation for out-of-town students. Includes meals, study halls, recreational facilities, and 24/7 supervision.",
            facilities: ["Dormitory rooms", "Dining hall", "Study rooms", "Recreation area", "Medical care"]
          },
          {
            slug: "mosque",
            name: "Campus Mosque",
            summary: "Central place of worship hosting congregational prayers and community programs.",
            description: "Beautiful mosque serving as the spiritual center of our campus. Regular congregational prayers, Friday sermons, and special programs throughout the year.",
            facilities: ["Prayer halls", "Ablution areas", "Community hall", "Audio system"]
          }
        ]);
      }
    };

    loadDepartments();
  }, []);

  const categories = {
    all: 'All Programs',
    academic: 'Academic Programs',
    services: 'Services & Facilities'
  };

  const getCategory = (dept: Department): string => {
    if (['library', 'hostel', 'mosque'].includes(dept.slug)) {
      return 'services';
    }
    return 'academic';
  };

  const filteredDepartments = departments.filter(dept => 
    selectedCategory === 'all' || getCategory(dept) === selectedCategory
  );

  const getIcon = (slug: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      tajweed: BookOpen,
      hifz: Heart,
      hadith: BookOpen,
      fiqh: GraduationCap,
      arabic: BookOpen,
      library: BookOpen,
      hostel: Home,
      mosque: Building
    };
    return icons[slug] || BookOpen;
  };

  if (selectedDepartment) {
    const IconComponent = getIcon(selectedDepartment.slug);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedDepartment(null)}
                className="text-[#1F7A53] hover:text-[#1F7A53]/80"
              >
                ← Back to Departments
              </Button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E]">
                  {selectedDepartment.name}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {selectedDepartment.summary}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-card mb-8">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-[#0B0D0E] mb-4">Program Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedDepartment.description}
                    </p>

                    {selectedDepartment.facilities && (
                      <div>
                        <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">Facilities Available</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedDepartment.facilities.map((facility, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-[#1F7A53] flex-shrink-0" />
                              <span className="text-gray-700">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="border-0 shadow-card mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#1F7A53]">Program Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDepartment.duration && (
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-gray-600">{selectedDepartment.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedDepartment.prerequisites && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Prerequisites</p>
                          <p className="text-gray-600">{selectedDepartment.prerequisites}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Class Size</p>
                        <p className="text-gray-600">15-20 students</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#0B0D0E] mb-4">Ready to Apply?</h3>
                    <p className="text-gray-600 mb-4">
                      Contact our admissions office for more information about this program.
                    </p>
                    <Button 
                      className="w-full bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
                      onClick={() => onPageChange('contact')}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4">
            Departments & Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive Islamic education across various disciplines, 
            designed to nurture knowledge, character, and spiritual growth.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
              {Object.entries(categories).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="text-sm">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => {
                const IconComponent = getIcon(dept.slug);
                const isService = getCategory(dept) === 'services';
                
                return (
                  <Card 
                    key={dept.slug} 
                    className="group hover:shadow-lg transition-all duration-300 border-0 shadow-card cursor-pointer"
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isService 
                          ? 'bg-gradient-to-br from-[#1E5FA8] to-[#1F7A53]'
                          : 'bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8]'
                      }`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl group-hover:text-[#1F7A53] transition-colors leading-tight">
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
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">{dept.summary}</p>
                      
                      {dept.duration && (
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock className="w-4 h-4 mr-2" />
                          {dept.duration}
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-1 transition-transform"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B0D0E] mb-4">
              Supporting Your Educational Journey
            </h2>
            <p className="text-xl text-gray-600">
              Beyond academics, we provide comprehensive support services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">Digital Resources</h3>
                <p className="text-gray-600">
                  Access to online library, digital manuscripts, and e-learning platforms 
                  for enhanced learning experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">Dining Services</h3>
                <p className="text-gray-600">
                  Nutritious halal meals served in our dining hall, with special 
                  arrangements for dietary requirements and religious occasions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">Student Welfare</h3>
                <p className="text-gray-600">
                  Comprehensive student support including counseling, medical care, 
                  and guidance for personal and spiritual development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of scholars and embark on a transformative educational experience 
            rooted in Islamic tradition and contemporary understanding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-[#1F7A53] hover:bg-white/90"
              onClick={() => onPageChange('contact')}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1F7A53]"
              onClick={() => onPageChange('about')}
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;