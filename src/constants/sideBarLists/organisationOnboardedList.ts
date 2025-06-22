import { SidebarItem } from './sideBarList.type';

export const organisationOnboardedMenuList: SidebarItem[] = [
  {
    text: 'Plant overview',
    icon: 'FactoryIcon',
    linkRoute: '/PlantOverview',
    show: false,
  },
];
export const organisationExtraMenuList: SidebarItem[] = [
  {
    text: 'Organisation info',
    icon: 'FactoryIcon',
    linkRoute: '/organisationOnboarding',
    show: false,
  },
  {
    text: 'Report',
    icon: 'FactoryIcon',
    linkRoute: '/report',
    show: false,
  },
];
