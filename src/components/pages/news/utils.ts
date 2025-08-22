import { TAG_COLORS, TAG_ICONS } from './constants';
import { BookOpen } from 'lucide-react';

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTagColor = (tag: string): string => {
  return TAG_COLORS[tag] || 'border-gray-500 text-gray-500';
};

export const getIcon = (tag: string) => {
  return TAG_ICONS[tag] || BookOpen;
};

export const filterNews = (news: any[], selectedCategory: string) => {
  return news.filter(item => 
    selectedCategory === 'all' || item.tag.toLowerCase() === selectedCategory
  );
};

export const paginateNews = (news: any[], currentPage: number, itemsPerPage: number) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return news.slice(startIndex, startIndex + itemsPerPage);
};