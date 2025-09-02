import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const departments: Department[] = Object.values(t('departmentsPage', { returnObjects: true }));

  const categories = {
    all: t('departmentsPage.categories.allPrograms'),
    academic: t('departmentsPage.categories.academicPrograms'),
    services: t('departmentsPage.categories.servicesFacilities')
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
                {t('departmentsPage.backToDepartments')}
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
                    <h2 className="text-2xl font-bold text-[#0B0D0E] mb-4">{t('departmentsPage.programOverview')}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedDepartment.description}
                    </p>

                    {selectedDepartment.facilities && (
                      <div>
                        <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.facilitiesAvailable')}</h3>
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
                    <CardTitle className="text-[#1F7A53]">{t('departmentsPage.programDetails')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDepartment.duration && (
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{t('departmentsPage.duration')}</p>
                          <p className="text-gray-600">{selectedDepartment.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedDepartment.prerequisites && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{t('departmentsPage.prerequisites')}</p>
                          <p className="text-gray-600">{selectedDepartment.prerequisites}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{t('departmentsPage.classSize')}</p>
                        <p className="text-gray-600">{t('departmentsPage.classSizeValue')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.readyToApplyTitle')}</h3>
                    <p className="text-gray-600 mb-4">
                      {t('departmentsPage.readyToApplyDescription')}
                    </p>
                    <Button 
                      className="w-full bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
                      onClick={() => onPageChange('contact')}
                    >
                      {t('departmentsPage.applyNow')}
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
            {t('departmentsPage.pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('departmentsPage.pageSubtitle')}
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
                          {isService ? t('departmentsPage.card.service') : t('departmentsPage.card.academic')}
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
                        {t('departmentsPage.card.learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
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
              {t('departmentsPage.supportingJourneyTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('departmentsPage.beyondAcademics')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1F7A53] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.digitalResourcesTitle')}</h3>
                <p className="text-gray-600">
                  {t('departmentsPage.digitalResourcesDescription')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.diningServicesTitle')}</h3>
                <p className="text-gray-600">
                  {t('departmentsPage.diningServicesDescription')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B0D0E] mb-4">{t('departmentsPage.studentWelfareTitle')}</h3>
                <p className="text-gray-600">
                  {t('departmentsPage.studentWelfareDescription')}
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
            {t('departmentsPage.readyToBeginJourney')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('departmentsPage.joinCommunity')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-[#1F7A53] hover:bg-white/90"
              onClick={() => onPageChange('contact')}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              {t('departmentsPage.applyNow')}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1F7A53]"
              onClick={() => onPageChange('about')}
            >
              {t('departmentsPage.learnMoreAboutUs')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;