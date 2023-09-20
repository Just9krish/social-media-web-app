import { Bell, Home, PenSquare, Search, User } from 'lucide-react';

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
