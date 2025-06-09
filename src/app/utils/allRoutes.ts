import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';

export const sideBarDrawerList = [
  {
    label: 'Organization Information',
    toNavigate: '/organisationOnboarding',
    Icon: CorporateFareOutlinedIcon,
  },
  {
    label: 'Point Of Contact',
    toNavigate: '/addContactPerson',
    Icon: ContactPageOutlinedIcon,
  },
  {
    label: 'Plant',
    toNavigate: '/plantOverview',
    Icon: ApartmentOutlinedIcon,
  },
  {
    label: 'Preview',
    toNavigate: '/preview',
    Icon: PreviewOutlinedIcon,
  },
];
