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
    icon: 'BusinessIcon', // or 'BusinessIcon'
    linkRoute: '/organisationOnboarding',
    show: false,
  },
  {
    text: 'Report',
    icon: 'AssessmentIcon', // or 'DescriptionIcon'
    linkRoute: '/reportHistory',
    show: false,
  },
];
