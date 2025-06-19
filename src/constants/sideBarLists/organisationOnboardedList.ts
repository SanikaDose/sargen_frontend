export interface SidebarItem {
  text: string;
  icon: string; // This is the type for MUI icons
  linkRoute: string;
  show: boolean;
}
export const organisationOnboardedMenuList: SidebarItem[] = [
  {
    text: 'Plant',
    icon: 'HomeRoundedIcon',
    linkRoute: '/PlantOverview',

    show: false,
  },
];

export const plantAssessmentMenuList: SidebarItem[] = [
  {
    text: 'Industry selection',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'Planning Horizon',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'KPI Defination',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'Cost Profile',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'Questions',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
];
