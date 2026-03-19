import { NavItem } from '../../types';

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'home', labelKey: 'nav.home', href: '/' },
  { id: 'services', labelKey: 'nav.services', href: '/services' },
  { id: 'about', labelKey: 'nav.about', href: '/about' },
  { id: 'portfolio', labelKey: 'nav.portfolio', href: '/portfolio' },
  { id: 'careers', labelKey: 'nav.careers', href: '/careers' },
  { id: 'news', labelKey: 'nav.news', href: '/news' },
  { id: 'contact', labelKey: 'nav.contact', href: '/contact' },
];

export const HOME_STORY_ANCHORS: NavItem[] = [
  { id: 'story-globe', labelKey: 'nav.story.globe', href: '/#globe-trigger', hash: 'globe-trigger' },
  { id: 'story-intro', labelKey: 'nav.story.intro', href: '/#about', hash: 'about' },
  { id: 'story-services', labelKey: 'nav.story.services', href: '/#services-overview', hash: 'services-overview' },
  { id: 'story-projects', labelKey: 'nav.story.projects', href: '/#projects', hash: 'projects' },
];
