import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  Search,
  Tag
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

interface NoticePageProps {
  onPageChange: (page: string) => void;
}

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content?: string;
  author?: string;
  category?: string;
}

// Constants
const ITEMS_PER_PAGE = 6;

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

// Fallback data function
const getFallbackNewsData = (): NewsItem[] => [
//  {
    // slug: "admissions-open-2025",
    // title: "Admissions Open for Academic Year 2025",
    // date: "2025-01-15",
    // tag: "Announcement",
    // excerpt: "Applications are now open for the new academic year. Early bird discounts available until March 31st.",
    // content: "We are pleased to announce that admissions for the Academic Year 2025 are now open. This year, we are offering expanded programs and new scholarship opportunities for deserving students. The application process has been streamlined to make it easier for prospective students and their families.",
    // author: "Admin Office",
    // category: "admissions"
  //},
  {
    slug: "shasmahi-ke-imtihaan-2025",
    title: "Shasmahi ke imtihaan",
    date: "2025-08-25",
    tag: "Event",
    excerpt: "Final Exam will start from 31st August and end on 8th September. And the madrasa will reopen from 23rd September.",
    content: "Will be Updated Soon",
    author: "Academic Affairs",
    category: "events"
  },
  // {
  //   slug: "merit-scholarship-2025",
  //   title: "Merit-Based Scholarship Program Launched",
  //   date: "2025-02-20",
  //   tag: "Announcement",
  //   excerpt: "New scholarship opportunities for outstanding students across all programs.",
  //   content: "We are excited to announce our new Merit-Based Scholarship Program, designed to support exceptional students in their educational journey. The program covers partial to full tuition fees based on academic performance and need assessment.",
  //   author: "Financial Aid Office",
  //   category: "scholarships"
  // },
  // {
  //   slug: "digital-library-expansion",
  //   title: "Digital Library Collection Expanded",
  //   date: "2025-01-30",
  //   tag: "Notice",
  //   excerpt: "Our digital collection now includes over 5,000 Islamic manuscripts, books, and multimedia resources.",
  //   content: "The library is proud to announce a significant expansion of our digital collection. Students and faculty now have access to an extensive range of Islamic texts, historical manuscripts, and modern research materials.",
  //   author: "Library Services",
  //   category: "academics"
  // },
  // {
  //   slug: "graduation-ceremony-2024",
  //   title: "Annual Graduation Ceremony 2024",
  //   date: "2024-12-15",
  //   tag: "Event",
  //   excerpt: "Celebrating the achievements of our graduating class with distinguished guests and scholars.",
  //   content: "Our annual graduation ceremony was a remarkable celebration of academic achievement and spiritual growth. We honored our graduates who have completed their studies in various Islamic disciplines.",
  //   author: "Event Committee",
  //   category: "events"
  // },
  // {
  //   slug: "community-outreach-program",
  //   title: "Community Outreach Initiative Launched",
  //   date: "2024-11-20",
  //   tag: "Notice",
  //   excerpt: "Students and faculty engaging with local communities through educational and service initiatives.",
  //   content: "Our new Community Outreach Program aims to strengthen ties with the local community through educational workshops, charity drives, and volunteer services.",
  //   author: "Community Relations",
  //   category: "community"
  // },
  // {
  //   slug: "faculty-training-workshop",
  //   title: "Faculty Development Workshop Series",
  //   date: "2024-10-25",
  //   tag: "Notice",
  //   excerpt: "Professional development opportunities for faculty members to enhance teaching methodologies.",
  //   content: "A comprehensive workshop series designed to enhance teaching skills and incorporate modern pedagogical approaches while maintaining traditional Islamic educational values.",
  //   author: "Human Resources",
  //   category: "faculty"
  // },
  // {
  //   slug: "technology-upgrade-2024",
  //   title: "Campus Technology Infrastructure Upgraded",
  //   date: "2024-09-18",
  //   tag: "Notice",
  //   excerpt: "New high-speed internet, modern classrooms, and enhanced digital learning platforms.",
  //   content: "Our commitment to modern education includes significant technology upgrades across the campus, providing students and faculty with better digital tools for learning and research.",
  //   author: "IT Department",
  //   category: "infrastructure"
  // }
];

// Category Tabs Component
const CategoryTabs: React.FC<{
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { key: 'all', label: 'All Notice' },
    { key: 'announcement', label: 'Announcements' },
    { key: 'event', label: 'Events' },
    { key: 'notice', label: 'General Notice' },
    { key: 'academics', label: 'Academic' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.key}
          onClick={() => onCategoryChange(category.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.key
              ? 'bg-[#1F7A53] text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
};

// News Card Component
const NewsCard: React.FC<{
  article: NewsItem;
  onReadMore: (article: NewsItem) => void;
}> = ({ article, onReadMore }) => {
  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-500 border-0 shadow-card hover:bg-gradient-to-tr from-[#E8F5EF] to-[#EAF2FB] cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge 
            variant="outline" 
            className={`${
              article.tag === 'Announcement' 
                ? 'border-[#1F7A53] text-[#1F7A53]'
                : article.tag === 'Event'
                ? 'border-[#1E5FA8] text-[#1E5FA8]'
                : 'border-gray-400 text-gray-600'
            } group-hover:scale-105 transition-transform duration-300`}
          >
            {article.tag}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-[#1F7A53] transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-2 transition-all duration-300"
          onClick={() => onReadMore(article)}
        >
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

// Pagination Component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i as number);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white disabled:opacity-50"
      >
        Previous
      </Button>
      
      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
          disabled={typeof page !== 'number'}
          className={
            currentPage === page
              ? 'bg-[#1F7A53] text-white'
              : typeof page === 'number'
              ? 'border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white'
              : 'border-transparent text-gray-400'
          }
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};

// Article View Component
const ArticleView: React.FC<{
  article: NewsItem;
  onBack: () => void;
  onPageChange: (page: string) => void;
}> = ({ article, onBack, onPageChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section 
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={onBack}
            className="flex items-center text-[#1F7A53] hover:text-[#1F7A53]/80 mb-6 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Notice
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Badge 
                variant="outline" 
                className={
                  article.tag === 'Announcement' 
                    ? 'border-[#1F7A53] text-[#1F7A53]'
                    : article.tag === 'Event'
                    ? 'border-[#1E5FA8] text-[#1E5FA8]'
                    : 'border-gray-400 text-gray-600'
                }
              >
                {article.tag}
              </Badge>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4">
              {article.title}
            </h1>
            
            {article.author && (
              <p className="text-gray-600 mb-8">
                By {article.author}
              </p>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">
                {article.content || article.excerpt}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={() => onPageChange('contact')}
                    className="bg-[#1F7A53] hover:bg-[#1F7A53]/90 text-white"
                  >
                    Contact for More Info
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline"
                    onClick={onBack}
                    className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
                  >
                    Back to Notice
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const NoticePage: React.FC<NoticePageProps> = ({ onPageChange }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/data/news.json');
        if (response.ok) {
          const data = await response.json();
          setNews(data);
          setFilteredNews(data);
        } else {
          throw new Error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error loading news:', error);
        const fallbackData = getFallbackNewsData();
        setNews(fallbackData);
        setFilteredNews(fallbackData);
      }
      setIsLoading(false);
    };

    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.tag?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [news, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReadMore = (article: NewsItem) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (selectedArticle) {
    return (
      <ArticleView
        article={selectedArticle}
        onBack={handleBackToList}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section 
        className="bg-gradient-to-r from-[#E8F5EF] via-white to-[#EAF2FB] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Notice & Announcements
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Stay informed with the latest updates, announcements, and news from our madrasa community
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 bg-white border-gray-200 focus:border-[#1F7A53] focus:ring-[#1F7A53]/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Category Tabs and Filters */}
      <motion.section 
        className="py-8 bg-white border-b"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants}>
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          {/* Results Summary */}
          <motion.div 
            className="flex flex-wrap items-center justify-between mt-6 gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Filter className="w-4 h-4" />
                <span>Showing {filteredNews.length} results</span>
              </div>
              {searchTerm && (
                <Badge variant="outline" className="border-[#1F7A53] text-[#1F7A53]">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="border-[#1E5FA8] text-[#1E5FA8]">
                  Category: {selectedCategory}
                </Badge>
              )}
            </div>

            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-gray-500 hover:text-[#1F7A53]"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* News Grid */}
      <motion.section 
        className="py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F7A53] mx-auto mb-4"></div>
              <p className="text-gray-500">Loading notices...</p>
            </motion.div>
          ) : filteredNews.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notices found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or category filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="border-[#1F7A53] text-[#1F7A53] hover:bg-[#1F7A53] hover:text-white"
              >
                View All Notices
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                variants={containerVariants}
              >
                {paginatedNews.map((item, index) => (
                  <motion.div
                    key={`${item.slug}-${currentPage}`}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <NewsCard
                      article={item}
                      onReadMore={handleReadMore}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <motion.div variants={itemVariants}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        className="py-16 bg-white"
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
            <h2 className="text-3xl font-bold text-[#0B0D0E] mb-4">
              Stay Connected
            </h2>
            <p className="text-xl text-gray-600">
              Multiple ways to receive updates and announcements
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Calendar,
                title: "Monthly Updates",
                description: "Comprehensive monthly reports covering all academic and administrative activities.",
                count: "12+ per year"
              },
              {
                icon: Tag,
                title: "Event Announcements",
                description: "Timely notifications about upcoming events, ceremonies, and special programs.",
                count: "50+ events"
              },
              {
                icon: Clock,
                title: "Urgent Notices",
                description: "Important updates regarding schedule changes, closures, and emergency information.",
                count: "Real-time"
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="bg-gradient-to-tr from-white to-[#E8F5EF] p-8 rounded-2xl shadow-card text-center hover:shadow-xl transition-all duration-500">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-[#1F7A53] to-[#1E5FA8] rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#0B0D0E] mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Badge 
                      variant="outline" 
                      className="border-[#1F7A53] text-[#1F7A53] bg-white/50"
                    >
                      {item.count}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Never Miss an Update
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Subscribe to our notifications or visit our office for the latest information 
            about admissions, events, and important announcements.
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
                className="bg-white text-[#1F7A53] hover:bg-white/90"
                onClick={() => onPageChange('contact')}
              >
                Contact Office
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-blue  bg-white text-[#1F7A53]"
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

export default NoticePage;