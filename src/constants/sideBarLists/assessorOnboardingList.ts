import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { SidebarItem } from './assessorOnboardedList';

export const assessorOnboardingMenuList: SidebarItem[] = [
  {
    text: 'Organisation onboarding',
    icon: HomeRoundedIcon,
    linkRoute: 'organisationOnboarding',

    show: false,
    isActive: true,
  },
  {
    text: 'Add contact person',
    icon: HomeRoundedIcon,
    linkRoute: 'AddContactPerson',

    show: false,
    isActive: true,
  },
];
