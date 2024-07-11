export type SideNavItem = {
  title: string;
  path: string;
  icon?: string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type Header = {
  heading: string;
  transaction: string;
  color: string;
}

export type HeaderNavItem = {
  navItem: string;
  path: string;
}