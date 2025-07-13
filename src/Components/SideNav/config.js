import uuid from "react-uuid";

import { IoIosFolder } from "react-icons/io";
import {
  MdCastForEducation,
  MdCategory,
  MdNotificationsActive,
  MdOutlinePayments,
  MdSettings,
  MdSubscriptions,
} from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import {
  BiAccessibility,
  BiCategoryAlt,
  BiSolidCoupon,
  BiSolidUserAccount,
} from "react-icons/bi";
import { CiGrid42 } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { MdBlock } from "react-icons/md";
import { GrShieldSecurity } from "react-icons/gr";

export const menuItems = [
  {
    id: uuid(),
    multiple: false,
    name: "Dashboard",
    menuLink: "/dashboard",
    active: "Dashboard",
    icon: CiGrid42,
  },
  {
    id: uuid(),
    multiple: false,
    name: "Users",
    menuLink: "/users",
    active: "Users",
    icon: FaUsers,
  },

  {
    id: uuid(),
    multiple: false,
    name: "Admin Accounts",
    menuLink: "/manageadmin",
    active: "Admin Accounts",
    icon: BiSolidUserAccount,
  },
  {
    id: uuid(),
    multiple: false,
    name: "Role Management",
    menuLink: "/permissions",
    active: "Role Management",
    icon: GrShieldSecurity,
  },

  {
    id: uuid(),
    multiple: false,
    name: "Reported Users",
    menuLink: "/Reportedusers",
    active: "Reported Users",
    icon: MdBlock,
  },
  {
    id: uuid(),
    multiple: false,
    name: "Plans",
    menuLink: "/plans",
    active: "Plans",
    icon: MdSubscriptions,
  },
  {
    id: uuid(),
    multiple: false,
    name: "Coupons",
    menuLink: "/coupons",
    active: "Coupons",
    icon: BiSolidCoupon,
  },

  {
    id: uuid(),
    multiple: true,
    name: "Personal Information",
    menuLink: "/personalInformation",
    active: "Personal Information",
    icon: BiCategoryAlt,
    items: [
      {
        id: "1",
        name: "Job Locations",
        menuLink: "/locations",
        active: "Job Locations",
      },
      {
        id: "2",
        name: "States",
        menuLink: "/state",
        active: "States",
      },
      {
        id: "3",
        name: "Cities",
        menuLink: "/city",
        active: "Cities",
      },
      {
        id: "4",
        name: "Height",
        menuLink: "/height",
        active: "Height",
      },
      {
        id: "5",
        name: "Weight",
        menuLink: "/weight",
        active: "Weight",
      },
      {
        id: "6",
        name: "Hobbies",
        menuLink: "/hobbies",
        active: "Hobbies",
      },
      {
        id: "6",
        name: "Languages",
        menuLink: "/languages",
        active: "Languages",
      },

      {
        id: "7",
        name: "Income",
        menuLink: "/income",
        active: "Income",
      },
    ],
  },

  {
    id: uuid(),
    multiple: true,
    name: "Caste & Communities",
    menuLink: "/CasteandCommunities",
    active: "Caste & Communities",
    icon: CgCommunity,
    items: [
      {
        id: "1",
        name: "Religion",
        menuLink: "/religions",
        active: "Religion",
      },
      {
        id: "2",
        name: "Caste",
        menuLink: "/caste",
        active: "Caste",
      },
      {
        id: "3",
        name: "Subcaste",
        menuLink: "/subcaste",
        active: "Subcaste",
      },
    ],
  },
  {
    id: uuid(),
    multiple: true,
    name: "Career & Education",
    menuLink: "/CareerandEducation",
    active: "Career & Education",
    icon: MdCastForEducation,
    items: [
      {
        id: "1",
        name: "Qualification Category",
        menuLink: "/qualificationCategory",
        active: "Qualification Category",
      },
      {
        id: "2",
        name: "Qualification",
        menuLink: "/qualification",
        active: "Qualification",
      },
      {
        id: "3",
        name: "Profession Category",
        menuLink: "/pCategory",
        active: "Profession Category",
      },
      {
        id: "4",
        name: "Profession",
        menuLink: "/profession",
        active: "Profession",
      },
    ],
  },

  {
    id: uuid(),
    multiple: false,
    name: "Banners",
    menuLink: "/banners",
    active: "Banners",
    icon: PiFlagBannerFill,
  },

  {
    id: uuid(),
    multiple: false,
    name: "Payments",
    menuLink: "/payments",
    active: "Payments",
    icon: MdOutlinePayments,
  },

  {
    id: uuid(),
    multiple: false,
    name: "Notifications",
    menuLink: "/notifications",
    active: "Notifications",
    icon: MdNotificationsActive,
  },
  {
    id: uuid(),
    multiple: false,
    name: "Settings",
    menuLink: "/settings",
    active: "Settings",
    icon: MdSettings,
  },
];
