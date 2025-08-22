import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: string;
}

const translations: { en: Translations; ur: Translations } = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.programs": "Programs",
    "nav.resources": "Resources",
    "nav.notice": "Notice",
    "nav.contact": "Contact",
    
    // Hero Section
    "hero.title": "NADWATUL ULAMA",
    "hero.tagline": "Precision in Recitation. Depth in Knowledge. Service to Community.",
    "hero.subtitle": "A distinguished institution dedicated to Islamic scholarship and education since 1898",
    "hero.learnMore": "Learn More",
    "hero.exploreCourses": "Explore Courses",
    "hero.supportUs": "Support Us",
    
    // Stats
    "stats.yearsOfService": "Years of Service",
    "stats.students": "Students",
    "stats.programs": "Programs",
    "stats.faculty": "Faculty",
    
    // Programs Section
    "programs.title": "Our Programs & Courses",
    "programs.subtitle": "Comprehensive Islamic education across various disciplines, taught by qualified scholars and experienced educators.",
    "programs.viewAll": "View All Programs",
    "programs.learnMore": "Learn More",
    
    // Notice Section
    "notice.title": "Latest Notice & Announcements",
    "notice.subtitle": "Stay updated with our latest announcements and events",
    "notice.viewAll": "View All Notice",
    "notice.readMore": "Read More",
    
    // Testimonials
    "testimonials.title": "What Our Students Say",
    "testimonials.subtitle": "Hear from our graduates and current students about their experience",
    
    // CTA Section
    "cta.title": "Support Islamic Education",
    "cta.subtitle": "Your contribution helps us provide quality Islamic education, maintain our facilities, and support deserving students through scholarships.",
    "cta.donateNow": "Donate Now",
    "cta.learnMore": "Learn More",
    
    // Footer
    "footer.description": "Dedicated to preserving and teaching the sacred knowledge of Islam through traditional and modern methodologies since 1898.",
    "footer.quickLinks": "Quick Links",
    "footer.programs": "Our Programs",
    "footer.contact": "Contact Info",
    "footer.copyright": "Nadwatul Ulama. All rights reserved.",
    "footer.subtitle": "Preserving Islamic knowledge through traditional and modern education.",
    
    // Common
    "common.excellence": "Excellence",
    "common.care": "Care",
    "common.community": "Community",
    "common.achievement": "Achievement",
    "common.donate": "Donate",
    "common.applyNow": "Apply Now",
    "common.contactOffice": "Contact Office",
    "common.neverMissUpdate": "Never Miss an Update"
  },
  ur: {
    // Navigation
    "nav.home": "ہوم",
    "nav.about": "تعارف",
    "nav.programs": "کورسز",
    "nav.resources": "وسائل",
    "nav.notice": "اطلاعات",
    "nav.contact": "رابطہ",
    
    // Hero Section
    "hero.title": "ندوة العلماء",
    "hero.tagline": "نکاتِ قراءت میں مہارت۔ علم میں گہرائی۔ خدمتِ خلق۔",
    "hero.subtitle": "1898 سے اسلامی علوم و تعلیم کے لیے وقف ایک ممتاز ادارہ",
    "hero.learnMore": "مزید جانیں",
    "hero.exploreCourses": "کورسز دیکھیں",
    "hero.supportUs": "تعاون کریں",
    
    // Stats
    "stats.yearsOfService": "سال خدمت",
    "stats.students": "طلباء",
    "stats.programs": "کورسز",
    "stats.faculty": "اساتذہ",
    
    // Programs Section
    "programs.title": "ہمارے کورسز اور پروگرامز",
    "programs.subtitle": "مختلف شعبوں میں جامع اسلامی تعلیم، تجربہ کار علماء اور اساتذہ کی جانب سے۔",
    "programs.viewAll": "تمام کورسز دیکھیں",
    "programs.learnMore": "مزید جانیں",
    
    // Notice Section
    "notice.title": "تازہ اطلاعات و اعلانات",
    "notice.subtitle": "ہماری تازہ اطلاعات اور تقریبات سے آگاہ رہیں",
    "notice.viewAll": "تمام اطلاعات دیکھیں",
    "notice.readMore": "مکمل پڑھیں",
    
    // Testimonials
    "testimonials.title": "ہمارے طلباء کیا کہتے ہیں",
    "testimonials.subtitle": "ہمارے فارغین اور موجودہ طلباء کے تجربات سنیں",
    
    // CTA Section
    "cta.title": "اسلامی تعلیم کی حمایت کریں",
    "cta.subtitle": "آپ کا تعاون ہمیں معیاری اسلامی تعلیم فراہم کرنے، ہماری سہولات برقرار رکھنے، اور مستحق طلباء کو وظائف دینے میں مدد کرتا ہے۔",
    "cta.donateNow": "چندہ دیں",
    "cta.learnMore": "مزید جانیں",
    
    // Footer
    "footer.description": "1898 سے روایتی اور جدید طریقوں سے اسلامی علوم کی حفاظت اور تعلیم کے لیے وقف ادارہ۔",
    "footer.quickLinks": "فوری لنکس",
    "footer.programs": "ہمارے کورسز",
    "footer.contact": "رابطے کی معلومات",
    "footer.copyright": "ندوة العلماء۔ تمام حقوق محفوظ ہیں۔",
    "footer.subtitle": "روایتی اور جدید تعلیم کے ذریعے اسلامی علوم کا تحفظ۔",
    
    // Common
    "common.excellence": "بہترین",
    "common.care": "خیال",
    "common.community": "برادری",
    "common.achievement": "کامیابی",
    "common.donate": "چندہ",
    "common.applyNow": "ابھی اپلائی کریں",
    "common.contactOffice": "دفتر سے رابطہ",
    "common.neverMissUpdate": "کوئی اپڈیٹ نہ چھوڑیں"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'ur'>('en');

  useEffect(() => {
    // Load saved language from localStorage on client side only
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as 'en' | 'ur' | null;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ur')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: 'en' | 'ur') => {
    setLanguageState(lang);
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    // Update document direction safely
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const isRTL = language === 'ur';

  // Set initial direction safely
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};