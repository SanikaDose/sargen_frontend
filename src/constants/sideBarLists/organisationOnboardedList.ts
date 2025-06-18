import { SvgIconComponent } from '@mui/icons-material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
export interface SidebarItem {
  text: string;
  icon: SvgIconComponent; // This is the type for MUI icons
  linkRoute: string;
  show: boolean;
  isActive: boolean;
}
export const organisationOnboardedMenuList: SidebarItem[] = [
  {
    text: 'Plant',
    icon: HomeRoundedIcon,
    linkRoute: 'PlantOverview',

    show: false,
    isActive: false,
  },
  {
    text: 'Add contact person',
    icon: HomeRoundedIcon,
    linkRoute: 'AddContactPerson',

    show: false,
    isActive: false,
  },
];

export const plantAssessmentMenuList: SidebarItem[] = [
  {
    text: 'Industry selection',
    icon: HomeRoundedIcon,
    linkRoute: 'IndustrySelection',

    show: false,
    isActive: true,
  },
  {
    text: 'Planning Horizon',
    icon: HomeRoundedIcon,
    linkRoute: 'IndustrySelection',

    show: false,
    isActive: true,
  },
  {
    text: 'KPI Defination',
    icon: HomeRoundedIcon,
    linkRoute: 'IndustrySelection',

    show: false,
    isActive: true,
  },
  {
    text: 'Cost Profile',
    icon: HomeRoundedIcon,
    linkRoute: 'IndustrySelection',

    show: false,
    isActive: true,
  },
  {
    text: 'Questions',
    icon: HomeRoundedIcon,
    linkRoute: 'IndustrySelection',

    show: false,
    isActive: true,
  },
];
