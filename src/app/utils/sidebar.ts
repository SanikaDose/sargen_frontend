import { SidebarItem } from '@/constants/sideBarLists/assessorOnboardedList';

export const getSidebarWithActive = (list: SidebarItem[], pathname: string): SidebarItem[] => {
  return list.map((item) => ({
    ...item,
    isActive: item.linkRoute === pathname,
  }));
};
