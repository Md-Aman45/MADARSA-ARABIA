import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { GraduationCap } from 'lucide-react';
import ArticleView from './news/ArticleView';
import NewsCard from './news/NewsCard';
import CategoryTabs from './news/CategoryTabs';
import Pagination from './news/Pagination';
import { ITEMS_PER_PAGE } from './news/constants';
import { FALLBACK_NEWS_DATA } from './news/fallbackData';
import { filterNews, paginateNews } from './news/utils';

interface NewsPageProps {
  onPageChange: (page: string) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onPageChange }) => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/data/news.json');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        setNews(FALLBACK_NEWS_DATA);
      }
    };

    loadNews();
  }, []);

  const filteredNews = filterNews(news, selectedCategory);
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = paginateNews(filteredNews, currentPage, ITEMS_PER_PAGE);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (selectedArticle) {
    return (
      <ArticleView 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4">
            News & Notices
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest announcements, events, and news from our institution
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryTabs 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedNews.map((item) => (
              <NewsCard
                key={item.slug}
                item={item}
                onClick={() => setSelectedArticle(item)}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1F7A53] to-[#1E5FA8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't miss important updates about admissions, events, and programs. 
            Join our community and be part of our educational journey.
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

export default NewsPage;