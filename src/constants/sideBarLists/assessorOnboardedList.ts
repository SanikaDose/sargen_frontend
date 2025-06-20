export interface SidebarItem {
  text: string;
  icon: string; // This is the type for MUI icons
  linkRoute: string;
  isActive: boolean;
}
export const assessorOnboardedMenuList: SidebarItem[] = [
  {
    text: 'Plants list',
    icon: 'FactoryIcon',
    linkRoute: '/AssignedPlantsList',
    isActive: false,
  },
  {
    text: 'Add contact person',
    icon: 'ContactsIcon',
    linkRoute: '/AddContactPerson',
    isActive: false,
  },
];

export const plantAssessmentMenu: SidebarItem[] = [
  {
    text: 'Questionnaire Preview',
    icon: 'PreviewIcon',
    linkRoute: '/UserAssessmentPreview',
    isActive: false,
  },
];

export const PlantAssessmentMenuList: SidebarItem[] = [
  {
    text: 'Research and development',
    icon: 'ScienceIcon',
    linkRoute: 'R&D',
    isActive: false,
  },
  {
    text: 'Planning',
    icon: 'EventNoteIcon',
    linkRoute: 'Planning',
    isActive: false,
  },
  {
    text: 'Production',
    icon: 'HomeRoundedIcon',
    linkRoute: 'Production',
    isActive: false,
  },
  {
    text: 'Quality',
    icon: 'VerifiedIcon',
    linkRoute: 'Quality',
    isActive: false,
  },
  {
    text: 'Maintenance',
    icon: 'BuildIcon',
    linkRoute: 'Maintenance',
    isActive: false,
  },
  {
    text: 'Supply Chain Sales',
    icon: 'TrendingUpIcon',
    linkRoute: 'supply_chain_sales',
    isActive: false,
  },
  {
    text: 'Supply Chain Purchase',
    icon: 'ShoppingCartIcon',
    linkRoute: 'supply_chain_purchase',
    isActive: false,
  },
  {
    text: 'Finance',
    icon: 'AccountBalanceIcon',
    linkRoute: 'Finance',
    isActive: false,
  },
  {
    text: 'Utilities',
    icon: 'ElectricalServicesIcon',
    linkRoute: 'Utilities',
    isActive: false,
  },
  {
    text: 'IT',
    icon: 'ComputerIcon',
    linkRoute: 'IT',
    isActive: false,
  },
  {
    text: 'Learning and development',
    icon: 'SchoolIcon',
    linkRoute: 'L&D',
    isActive: false,
  },
  {
    text: 'Management',
    icon: 'SupervisorAccountIcon',
    linkRoute: 'Management',
    isActive: false,
  },
  {
    text: 'HR',
    icon: 'GroupIcon',
    linkRoute: 'HR',
    isActive: false,
  },
  {
    text: 'Dimension selection',
    icon: 'TuneIcon',
    linkRoute: 'DimensionSelection',
    isActive: false,
  },
  {
    text: 'Solution Selection',
    icon: 'ChecklistIcon',
    linkRoute: 'SolutionSelection',
    isActive: false,
  },

  {
    text: 'Report data',
    icon: 'AssessmentIcon',
    linkRoute: 'ReportData',
    isActive: false,
  },
  {
    text: 'Introduction',
    icon: 'InfoIcon',
    linkRoute: 'ROI',
    isActive: false,
  },
  {
    text: 'About Company',
    icon: 'BusinessIcon',
    linkRoute: 'ReportData',
    isActive: false,
  },
  {
    text: 'Summary Of Observation & recommendation',
    icon: 'SummarizeIcon',
    linkRoute: 'ReportData',
    isActive: false,
  },
  {
    text: 'ROI',
    icon: 'TrendingUpIcon',
    linkRoute: 'ROI',
    isActive: false,
  },

  {
    text: 'Comment',
    icon: 'CommentIcon',
    linkRoute: 'Comment',
    isActive: false,
  },
];
