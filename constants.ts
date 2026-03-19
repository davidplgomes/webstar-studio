import { Project, Expertise, NewsItem, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Systems', href: '#services-overview' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'FOX DELIVERY', category: 'Logistics Platform', image: '/portfolio-orbit.svg' },
  { id: 2, title: 'DATON', category: 'ESG Intelligence', image: '/portfolio-lattice.svg' },
  { id: 3, title: 'RANKEY.AI', category: 'AI Platform', image: '/portfolio-signal.svg' },
  { id: 4, title: 'CPB ADVOCACIA', category: 'Professional Services', image: '/portfolio-command.svg' },
  { id: 5, title: 'CIRANDA', category: 'Hospitality', image: '/portfolio-orbit.svg' },
  { id: 6, title: 'VERANNE BRAND', category: 'Retail & E-commerce', image: '/portfolio-signal.svg' },
];

export const EXPERTISE: Expertise[] = [
  {
    id: 'e1',
    number: '01',
    title: 'CONCEPTION',
    points: ['Artistic Direction', 'Technical Studies', 'Prototyping'],
  },
  {
    id: 'e2',
    number: '02',
    title: 'PRODUCTION',
    points: ['Material Sourcing', 'Craftsmanship', 'Quality Control'],
  },
  {
    id: 'e3',
    number: '03',
    title: 'INSTALLATION',
    points: ['Logistics', 'On-site Assembly', 'Safety Standards'],
  },
  {
    id: 'e4',
    number: '04',
    title: 'MAINTENANCE',
    points: ['Monitoring', 'Restoration', 'Upcycling'],
  },
];

export const NEWS: NewsItem[] = [
  { id: 1, date: 'OCT 2023', title: 'Exhibition at Palais de Tokyo', image: 'https://picsum.photos/id/20/600/400' },
  { id: 2, date: 'SEP 2023', title: 'New Collaboration with Zaha Hadid', image: 'https://picsum.photos/id/24/600/400' },
  { id: 3, date: 'AUG 2023', title: 'Award for Sustainable Design', image: 'https://picsum.photos/id/28/600/400' },
];

export const CLIENT_LOGOS = [
  'Fox Delivery', 'Daton', 'Rankey.ai', 'CPB Advocacia', 'Ciranda', 'Lisheen Springs', 'KM Style'
];

export const CITIES = ['RECIFE', 'DUBLIN', 'SAO PAULO', 'LONDON', 'MADRID', 'TORONTO', 'DUBAI', 'NEW YORK'];

// Animation Variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
