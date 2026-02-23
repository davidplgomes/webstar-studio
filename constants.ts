import { Project, Expertise, NewsItem, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Projets', href: '#projects' },
  { label: 'Expertises', href: '#expertise' },
  { label: 'Agence', href: '#agency' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'LUMINOUS VOID', category: 'Installation', image: 'https://picsum.photos/id/10/800/1000' },
  { id: 2, title: 'URBAN ECHO', category: 'Sculpture', image: 'https://picsum.photos/id/11/800/600' },
  { id: 3, title: 'SILENT FORM', category: 'Design', image: 'https://picsum.photos/id/12/800/800' },
  { id: 4, title: 'AETHER', category: 'Architecture', image: 'https://picsum.photos/id/13/800/1000' },
  { id: 5, title: 'CHRONOS', category: 'Digital', image: 'https://picsum.photos/id/14/800/700' },
  { id: 6, title: 'METAMORPHOSIS', category: 'Scenography', image: 'https://picsum.photos/id/15/800/900' },
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
  'Cartier', 'Dior', 'Louis Vuitton', 'Hermès', 'Chanel', 'Moët & Chandon', 'Van Cleef & Arpels'
];

export const CITIES = ['PARIS', 'SHANGHAI', 'LONDON', 'NEW YORK', 'VENICE', 'MONTPELLIER', 'TOKYO', 'MILAN'];

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