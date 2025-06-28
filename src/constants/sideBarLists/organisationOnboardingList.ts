import { SidebarItem } from './sideBarList.type';

export const organisationOnboardingMenuList: SidebarItem[] = [
  {
    text: 'Organisation details',
    icon: 'CorporateFareIcon',
    linkRoute: '/organisationOnboarding',
    show: false,
  },
  {
    text: 'Point of contact',
    icon: 'PermContactCalendarIcon',
    linkRoute: '/AddContactPerson',
    show: false,
  },
];
