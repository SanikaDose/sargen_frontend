import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { SidebarItem } from './organisationOnboardedList';
export const organisationOnboardingMenuList: SidebarItem[] = [
  {
    text: 'Organisation details',
    icon: CorporateFareIcon,
    linkRoute: 'organisationOnboarding',

    show: false,
    isActive: true,
  },
  {
    text: 'Point of contact',
    icon: PermContactCalendarIcon,
    linkRoute: 'AddContactPerson',

    show: false,
    isActive: true,
  },
];
