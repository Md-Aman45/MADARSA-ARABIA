import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { NEWS_CATEGORIES } from './constants';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto mb-12">
        {NEWS_CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-sm flex items-center space-x-1"
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;