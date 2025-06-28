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
    text: 'Supply Chain - Sales',
    icon: 'TrendingUpIcon',
    linkRoute: 'Supply Chain - Sales',
    matchKeyword: 'Supply Chain - Sales',
    show: false,
  },
  {
    text: 'Supply Chain - Purchase',
    icon: 'ShoppingCartIcon',
    linkRoute: 'Supply Chain - Purchase',
    matchKeyword: 'Supply Chain - Purchase',
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
    linkRoute: 'Learning & Development',
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

  {
    text: 'Preview',
    icon: 'VisibilityIcon',
    linkRoute: '/Preview',
    matchKeyword: 'Preview',
    show: false,
  },
];

export const platformUserAssessmentList = [...plantAssessmentConfigurationList, ...PlantAssessmentMenuList];

export const assessorUserAssessmentList = [
  {
    text: 'Industry selection',
    icon: 'DomainIcon',
    linkRoute: '/IndustrySelectionPreview',
    matchKeyword: 'IndustrySelectionPreview',
    show: false,
  },
  {
    text: 'Planning Horizon',
    icon: 'TimelineIcon',
    linkRoute: '/PlanningHorizonPreview',
    matchKeyword: 'PlanningHorizonPreview',
    show: false,
  },
  {
    text: 'KPI Defination',
    icon: 'SpeedIcon',
    linkRoute: '/KpiDefinitionPreview',
    matchKeyword: 'KpiDefinitionPreview',
    show: false,
  },
  {
    text: 'Cost Profile',
    icon: 'MonetizationOnIcon',
    linkRoute: '/CostProfilePreview',
    matchKeyword: 'CostProfilePreview',
    show: false,
  },
  // ...PlantAssessmentMenuList.filter((item) => item.text !== 'Preview'),
  {
    text: 'User Assessment Preview',
    icon: 'VisibilityIcon',
    linkRoute: '/UserAssessmentPreview',
    matchKeyword: 'UserAssessmentPreview',
    show: false,
  },
  {
    text: 'Dimension selection',
    icon: 'TuneIcon',
    linkRoute: '/AssessmentBasedImpactValues',
    show: false,
  },
  {
    text: 'Solution Selection',
    icon: 'ChecklistIcon',
    linkRoute: '/AssessmentSolution',
    show: false,
  },

  {
    text: 'Report data',
    icon: 'AssessmentIcon',
    matchKeyword: 'AddReportData',
    linkRoute: '/AddReportData',
    show: false,
  },
  {
    text: 'Report Draft',
    icon: 'AssessmentIcon',
    matchKeyword: 'ReportViewPage',
    linkRoute: '/ReportViewPage',
    show: false,
  },
  {
    text: 'Final Report',
    icon: 'AssessmentIcon',
    matchKeyword: 'ReportFinalPage',
    linkRoute: '/ReportFinalPage',
    show: false,
  },
  // {
  //   text: 'Introduction',
  //   icon: 'InfoIcon',
  //   linkRoute: 'ROI',
  //   show: false,
  // },
  // {
  //   text: 'About Company',
  //   icon: 'BusinessIcon',
  //   linkRoute: 'ReportData',
  //   show: false,
  // },
  // {
  //   text: 'Summary Of Observation & recommendation',
  //   icon: 'SummarizeIcon',
  //   linkRoute: 'ReportData',
  //   show: false,
  // },
  // {
  //   text: 'ROI',
  //   icon: 'TrendingUpIcon',
  //   linkRoute: 'ROI',
  //   show: false,
  // },

  // {
  //   text: 'Comment',
  //   icon: 'CommentIcon',
  //   linkRoute: 'Comment',
  //   show: false,
  // },
];
