import { Megaphone, PartyPopper, Trophy, BookOpen } from 'lucide-react';

export const NEWS_CATEGORIES = [
  { id: 'all', name: 'All', icon: BookOpen },
  { id: 'announcement', name: 'Announcements', icon: Megaphone },
  { id: 'event', name: 'Events', icon: PartyPopper },
  { id: 'news', name: 'News', icon: Trophy }
];

export const ITEMS_PER_PAGE = 6;

export const TAG_COLORS = {
  'Announcement': 'border-[#1F7A53] text-[#1F7A53]',
  'Event': 'border-[#1E5FA8] text-[#1E5FA8]',
  'News': 'border-purple-600 text-purple-600'
};

export const TAG_ICONS = {
  'Announcement': Megaphone,
  'Event': PartyPopper,
  'News': Trophy
};