import {
  Bell,
  Home,
  PenSquare,
  Search,
  User,
  Tag,
  Users,
  MessageCircle,
} from 'lucide-react';

export const navigationItems = [
  {
    text: 'Home',
    icon: <Home width={24} height={24} />,
    href: '/',
  },
  {
    text: 'Search',
    icon: <Search width={24} height={24} />,
    href: '/search',
  },
  {
    text: 'Create',
    icon: <PenSquare width={24} height={24} />,
    href: '/create-thread',
  },
  {
    text: 'Notification',
    icon: <Bell width={24} height={24} />,
    href: '/notification',
  },
  {
    text: 'Profile',
    icon: <User width={24} height={24} />,
    href: '/profile',
  },
];

// allow supported image typ
export const IMGEXTTYPE = ['svg', 'png', 'jpeg', 'jpg'];

// allow supported image size in MB
export const IMAGEALLOWEDSIZE = 2;

// profile tabs
export const profileTabs = [
  {
    value: 'dhagas',
    label: 'Dhagas',
    icon: <MessageCircle width={24} height={24} className="object-contain" />,
  },
  {
    value: 'replies',
    label: 'Replies',
    icon: <Users width={24} height={24} className="object-contain" />,
  },
  // {
  //   value: 'tagged',
  //   label: 'Tagged',
  //   icon: <Tag width={24} height={24} className="object-contain" />,
  // },
];
