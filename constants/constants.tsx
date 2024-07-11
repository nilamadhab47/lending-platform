
import { HeaderNavItem, SideNavItem } from '../types/Types';
import { Header } from '../types/Types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Account Recievable',
    path: '/dashboard/account-receivable',
    icon: "/icons/carbon_layers.svg"
  },
  {
    title: 'Projects List',
    path: '/dashboard/project-list',
    icon: "/icons/carbon_layers.svg"
  },
  {
    title: 'Account Payable',
    path: '/dashboard/account-payable',
    icon: "/icons/task-list.svg"

  },
  {
    title: 'Reporting',
    path: '/dashboard/reporting',
    icon: "/icons/white-flag.svg"

  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: "/icons/group.svg"

  },
];


export const LOWER_SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Support',
    path: '/dashboard/support',
    icon: "/icons/user-circle.svg"
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: "/icons/settings.svg"

  },
  
];


export const HEADER: Header[] = [
  {
    heading: "Total Transaction",
    transaction: "76",
    color: "#D398E7"
  },
  {
    heading: "Unsettled Transaction",
    transaction: "$53,000989",
    color: "#E89271"
  },
  {
    heading: "Total Commissions",
    transaction: "$53,000989",
    color: "#70A1E5"
  },
  {
    heading: "Avg Commissions",
    transaction: "3.5%",
    color: "#F0C274"
  }
]


export const HEADER_NAV: HeaderNavItem[] = [
  {
    navItem: "Active Transaction",
    path : '/dashboard/account-receivable'
  },
  {
    navItem: "Raised Invoices",
    path : '/dashboard/account-receivable/raised-invoice'
  },
  {
    navItem: "Invoice Settled",
    path : '/dashboard/account-receivable/invoice-settled',
  },
  {
    navItem: "All Transactions",
    path : '/dashboard/account-receivable/all-transaction'
  },
  {
    navItem: "Trash",
    path : '/dashboard/account-receivable/trash'
  }
]
export const PROJECT_HEADER_NAV: HeaderNavItem[] = [
  {
    navItem: "Projects",
    path : '/dashboard/project-list'
  },
  {
    navItem: "Archived Projects",
    path : '/dashboard/project-list/archived-projects'
  },
  
]
export const USER_HEADER_NAV: HeaderNavItem[] = [
  {
    navItem: "Company's Profile",
    path : '/dashboard/users'
  },
  {
    navItem: "Users",
    path : '/dashboard/users/user-profile'
  },
  {
    navItem: "Settings",
    path : '/dashboard/users/settings'
  },
  
]