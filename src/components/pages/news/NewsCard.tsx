import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatDate, getTagColor, getIcon } from './utils';

interface NewsCardProps {
  item: any;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onClick }) => {
  const IconComponent = getIcon(item.tag);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-card cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={getTagColor(item.tag)}>
            <IconComponent className="w-3 h-3 mr-1" />
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
        <CardTitle className="text-xl group-hover:text-[#1F7A53] transition-colors leading-tight">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-[#1F7A53] hover:text-[#1F7A53]/80 group-hover:translate-x-1 transition-transform"
        >
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;