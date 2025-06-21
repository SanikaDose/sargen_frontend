import { SidebarItem } from './sideBarList.type';

const plantAssessmentConfigurationList: SidebarItem[] = [
  {
    text: 'Industry selection',
    icon: 'DomainIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'Planning Horizon',
    icon: 'TimelineIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'KPI Defination',
    icon: 'SpeedIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
  {
    text: 'Cost Profile',
    icon: 'MonetizationOnIcon',
    linkRoute: '/IndustrySelection',
    show: false,
  },
];

const PlantAssessmentMenuList: SidebarItem[] = [
  {
    text: 'Research and development',
    icon: 'ScienceIcon',
    linkRoute: 'R&D',
    show: false,
  },
  {
    text: 'Planning',
    icon: 'EventNoteIcon',
    linkRoute: 'Planning',
    show: false,
  },
  {
    text: 'Production',
    icon: 'HomeRoundedIcon',
    linkRoute: 'Production',
    show: false,
  },
  {
    text: 'Quality',
    icon: 'VerifiedIcon',
    linkRoute: 'Quality',
    show: false,
  },
  {
    text: 'Maintenance',
    icon: 'BuildIcon',
    linkRoute: 'Maintenance',
    show: false,
  },
  {
    text: 'Supply Chain Sales',
    icon: 'TrendingUpIcon',
    linkRoute: 'supply_chain_sales',
    show: false,
  },
  {
    text: 'Supply Chain Purchase',
    icon: 'ShoppingCartIcon',
    linkRoute: 'supply_chain_purchase',
    show: false,
  },
  {
    text: 'Finance',
    icon: 'AccountBalanceIcon',
    linkRoute: 'Finance',
    show: false,
  },
  {
    text: 'Utilities',
    icon: 'ElectricalServicesIcon',
    linkRoute: 'Utilities',
    show: false,
  },
  {
    text: 'IT',
    icon: 'ComputerIcon',
    linkRoute: 'IT',
    show: false,
  },
  {
    text: 'Learning and development',
    icon: 'SchoolIcon',
    linkRoute: 'L&D',
    show: false,
  },
  {
    text: 'Management',
    icon: 'SupervisorAccountIcon',
    linkRoute: 'Management',
    show: false,
  },
  {
    text: 'HR',
    icon: 'GroupIcon',
    linkRoute: 'HR',
    show: false,
  },
];

export const platformUserAssessmentList = [...plantAssessmentConfigurationList, ...PlantAssessmentMenuList];

export const assessorUserAssessmentList = [
  ...plantAssessmentConfigurationList,
  ...PlantAssessmentMenuList,
  {
    text: 'Dimension selection',
    icon: 'TuneIcon',
    linkRoute: 'DimensionSelection',
    show: false,
  },
  {
    text: 'Solution Selection',
    icon: 'ChecklistIcon',
    linkRoute: 'SolutionSelection',
    show: false,
  },

  {
    text: 'Report data',
    icon: 'AssessmentIcon',
    linkRoute: 'ReportData',
    show: false,
  },
  {
    text: 'Introduction',
    icon: 'InfoIcon',
    linkRoute: 'ROI',
    show: false,
  },
  {
    text: 'About Company',
    icon: 'BusinessIcon',
    linkRoute: 'ReportData',
    show: false,
  },
  {
    text: 'Summary Of Observation & recommendation',
    icon: 'SummarizeIcon',
    linkRoute: 'ReportData',
    show: false,
  },
  {
    text: 'ROI',
    icon: 'TrendingUpIcon',
    linkRoute: 'ROI',
    show: false,
  },

  {
    text: 'Comment',
    icon: 'CommentIcon',
    linkRoute: 'Comment',
    show: false,
  },
];
