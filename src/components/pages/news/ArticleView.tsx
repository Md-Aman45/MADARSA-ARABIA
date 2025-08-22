import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { formatDate, getTagColor, getIcon } from './utils';

interface ArticleViewProps {
  article: any;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  const IconComponent = getIcon(article.tag);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#E8F5EF] via-white to-[#EAF2FB] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#1F7A53] hover:text-[#1F7A53]/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="outline" className={getTagColor(article.tag)}>
              <IconComponent className="w-3 h-3 mr-1" />
              {article.tag}
            </Badge>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.date)}
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0B0D0E] mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-card">
            <CardContent className="p-8">
              <div className="prose max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
              
              <div className="border-t mt-8 pt-6">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Published: {formatDate(article.date)}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Category: {article.tag}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ArticleView;