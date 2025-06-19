export interface SidebarItem {
  text: string;
  icon: string; // This is the type for MUI icons
  linkRoute: string;
  isActive: boolean;
}
export const assessorOnboardedMenuList: SidebarItem[] = [
  {
    text: 'Plant',
    icon: 'HomeRoundedIcon',
    linkRoute: '/PlantOverview',
    isActive: true,
  },
  {
    text: 'Add contact person',
    icon: 'HomeRoundedIcon',
    linkRoute: '/AddContactPerson',
    isActive: true,
  },
];

export const plantAssessmentMenuList: SidebarItem[] = [
  {
    text: 'Industry selection',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    isActive: true,
  },
  {
    text: 'Planning Horizon',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    isActive: true,
  },
  {
    text: 'KPI Defination',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    isActive: true,
  },
  {
    text: 'Cost Profile',
    icon: 'HomeRoundedIcon',
    linkRoute: 'IndustrySelection',
    isActive: true,
  },
  {
    text: 'Questions',
    icon: 'HomeRoundedIcon',
    linkRoute: '/IndustrySelection',
    isActive: true,
  },
];
