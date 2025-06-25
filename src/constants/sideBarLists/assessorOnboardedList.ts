import { SidebarItem } from './sideBarList.type';

export const assessorOnboardedMenuList: SidebarItem[] = [
  {
    text: 'Plants list',
    icon: 'FactoryIcon',
    linkRoute: '/AssignedPlantsList',
    show: false,
  },
];

export const assessorExtraList: SidebarItem[] = [
  {
    text: 'Settings',
    icon: 'FactoryIcon',
    linkRoute: '/AssessorSetting',
    show: false,
  },
  // {
  //   text: 'Assessor metadata',
  //   icon: 'FactoryIcon',
  //   linkRoute: '/AssignedPlantsList',
  //   show: false,
  // },
];
