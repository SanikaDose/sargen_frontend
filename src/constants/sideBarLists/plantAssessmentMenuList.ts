import { SidebarItem } from './sideBarList.type';

const plantAssessmentConfigurationList: SidebarItem[] = [
  {
    text: 'Industry selection',
    icon: 'DomainIcon',
    linkRoute: '/IndustrySelection',
    matchKeyword: 'IndustrySelection',
    show: false,
  },
  {
    text: 'Planning Horizon',
    icon: 'TimelineIcon',
    linkRoute: '/PlanningHorizon',
    matchKeyword: 'PlanningHorizon',
    show: false,
  },
  {
    text: 'KPI Defination',
    icon: 'SpeedIcon',
    linkRoute: '/KpiDefinition',
    matchKeyword: 'KpiDefinition',
    show: false,
  },
  {
    text: 'Cost Profile',
    icon: 'MonetizationOnIcon',
    linkRoute: '/CostProfile',
    matchKeyword: 'CostProfile',
    show: false,
  },
];

const PlantAssessmentMenuList: SidebarItem[] = [
  {
    text: 'Research and development',
    icon: 'ScienceIcon',
    linkRoute: 'R&D',
    matchKeyword: 'Research and development',
    show: false,
  },
  {
    text: 'Planning',
    icon: 'EventNoteIcon',
    linkRoute: 'Planning',
    matchKeyword: 'Planning',
    show: false,
  },
  {
    text: 'Production',
    icon: 'HomeRoundedIcon',
    linkRoute: 'Production',
    matchKeyword: 'Production',
    show: false,
  },
  {
    text: 'Quality',
    icon: 'VerifiedIcon',
    linkRoute: 'Quality',
    matchKeyword: 'Quality',
    show: false,
  },
  {
    text: 'Maintenance',
    icon: 'BuildIcon',
    linkRoute: 'Maintenance',
    matchKeyword: 'Maintenance',
    show: false,
  },
  {
    text: 'Supply Chain Sales',
    icon: 'TrendingUpIcon',
    linkRoute: 'supply_chain_sales',
    matchKeyword: 'supply_chain_sales',
    show: false,
  },
  {
    text: 'Supply Chain Purchase',
    icon: 'ShoppingCartIcon',
    linkRoute: 'supply_chain_purchase',
    matchKeyword: 'supply_chain_purchase',
    show: false,
  },
  {
    text: 'Finance',
    icon: 'AccountBalanceIcon',
    linkRoute: 'Finance',
    matchKeyword: 'Finance',
    show: false,
  },
  {
    text: 'Utilities',
    icon: 'ElectricalServicesIcon',
    linkRoute: 'Utilities',
    matchKeyword: 'Utilities',
    show: false,
  },
  {
    text: 'IT',
    icon: 'ComputerIcon',
    linkRoute: 'IT',
    matchKeyword: 'IT',
    show: false,
  },
  {
    text: 'Learning and development',
    icon: 'SchoolIcon',
    linkRoute: 'L&D',
    matchKeyword: 'Learning and development',
    show: false,
  },
  {
    text: 'Management',
    icon: 'SupervisorAccountIcon',
    linkRoute: 'Management',
    matchKeyword: 'Management',
    show: false,
  },
  {
    text: 'HR',
    icon: 'GroupIcon',
    linkRoute: 'HR',
    matchKeyword: 'HR',
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
