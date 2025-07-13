import Login from "../pages/Login/index";
import Users from "pages/Users/index";
import AddUser from "pages/Users/AddUser/AddUser";
import AddPlan from "pages/Plans/AddPlan/AddPlan";
import Plans from "pages/Plans/inedx";
import Coupons from "pages/Coupons/index";
import AddCoupon from "pages/Coupons/AddCoupon/AddCoupon";
import Religions from "pages/Religion/index";
import AddReligion from "pages/Religion/AddReligion/Add";
import Casts from "pages/Cast/index";
import Subcast from "pages/Subcast/index";
import AddCast from "pages/Cast/AddCast/Add";
import AddSubcast from "pages/Subcast/AddSubcast/Add";
import QCateggorys from "pages/QualificationCategorys/index";
import AddCategory from "pages/QualificationCategorys/AddQcategory/AddQcategory";
import Qualifications from "pages/Qualifications/index";
import AddQualification from "pages/Qualifications/AddQualification/AddQualification";
import Pcategorys from "pages/PCategorys/index";
import AddPcategory from "pages/PCategorys/AddPCategory/AddPcategory";
import Professions from "pages/Professional/index";
import AddProfession from "pages/Professional/AddProfessional/AddProfession";
import Banners from "pages/Banners/index";
import AddBanner from "pages/Banners/AddBanner/AddBanner";
import User from "pages/Users/User";
import Locations from "pages/JobLocations/index";
import AddLocation from "pages/JobLocations/AddLocation/Add";
import Weights from "pages/Weights/index";
import AddWeight from "pages/Weights/AddWeight/Add";
import Heights from "pages/Heights/index";
import AddHeight from "pages/Heights/AddHeight/Add";
import Income from "pages/Income/index";
import AddIncome from "pages/Income/AddIncome/Add";
import Hobbies from "pages/Hobbies/index";
import AddHobbies from "pages/Hobbies/AddHobby/Add";
import Payments from "pages/Payments/index";
import Notification from "pages/Notifications/index";
import DashboardCharts from "pages/Categories/index";
import ReportedUsers from "pages/ReportedUsers/index";
import States from "pages/States/index";
import AddState from "pages/States/AddState/AddState";
import Citys from "pages/Citys/index";
import AddCity from "pages/Citys/AddCiti/AddCity";
import Languages from "pages/Languages/index";
import AddLanguage from "pages/Languages/AddLanguages/AddLanguage";
import AdminRoles from "pages/AdminAccounts/index";
import AddAccountforAdmin from "pages/AdminAccounts/AddAdminAccount/AddAccountforAdmin";
import Permissions from "pages/AdminPermissions/index";
import AddPermissions from "pages/AdminPermissions/AddPermissions";
import Settings from "pages/Settings/index";
import ConfigUpdate from "pages/Settings/Add/ConfigUpdate";

export const AccessKeys = {
  DashboardCharts: "Dashboard",
  Users: "Users",
  Plans: "Plans",
  Coupons: "Coupons",
  Religions: "Religions",
  Casts: "Cast",
  Subcast: "Subcast",
  QCateggorys: "QCateggorys",
  Qualifications: "Qualifications",
  Pcategorys: "Pcategorys",
  Professions: "Professions",
  Banners: "Banners",
  Locations: "Locations",
  Weights: "Weights",
  Heights: "Heights",
  Hobbys: "Hobbys",
  Hobbies: "Hobbies",
  Income: "Income",
  Payments: "Payments",
  Notification: "Notification",
  ReportedUsers: "ReportedUsers",
  States: "States",
  Citys: "Citys",
  Languages: "Languages",
  AdminRoles: "AdminAccounts",
  Permissions: "RoleManagement",
  Settings: "Settings",
};

export const PageRoutes = [
  { path: "/", element: <Login />, AccessKey: AccessKeys.Login, Type: "read" },

  {
    path: "/dashboard",
    element: <DashboardCharts />,
    AccessKey: AccessKeys.Dashboard,
    Type: "read",
    Name: "Dashboard",
  },

  {
    path: "/users",
    element: <Users />,
    AccessKey: AccessKeys.Users,
    Type: "read",
    Name: "Users",
  },

  {
    path: "/users/:user",
    element: <AddUser />,
    AccessKey: AccessKeys.Users,
    Type: "write",
    Name: "Users",
  },

  {
    path: "/users/Details",
    element: <User />,
    AccessKey: AccessKeys.Users,
    Type: "read",
    Name: "Users",
  },
  {
    path: "/manageadmin",
    element: <AdminRoles />,
    AccessKey: AccessKeys.AdminAccounts,
    Type: "read",
    Name: "Admin Accounts",
  },
  {
    path: "/manageadmin/add",
    element: <AddAccountforAdmin />,
    AccessKey: AccessKeys.AdminAccounts,
    Type: "write",
    Name: "Admin Accounts",
  },
  {
    path: "/manageadmin/Update",
    element: <AddAccountforAdmin />,
    AccessKey: AccessKeys.AdminAccounts,
    Type: "write",
    Name: "Admin Accounts",
  },

  {
    path: "/permissions",
    element: <Permissions />,
    AccessKey: AccessKeys.RoleManagement,
    Type: "read",
    Name: "Role Management",
  },
  {
    path: "/permissions/add",
    element: <AddPermissions />,
    AccessKey: AccessKeys.RoleManagement,
    Type: "write",
    Name: "Role Management",
  },

  {
    path: "/Reportedusers",
    element: <ReportedUsers />,
    AccessKey: AccessKeys.ReportedUsers,
    Type: "read",
    Name: "Reported Users",
  },

  {
    path: "/plans",
    element: <Plans />,
    AccessKey: AccessKeys.Plans,
    Type: "read",
    Name: "Plans",
  },

  {
    path: "/plans/:plan",
    element: <AddPlan />,
    AccessKey: AccessKeys.Plans,
    Type: "write",
    Name: "Plans",
  },

  {
    path: "/coupons",
    element: <Coupons />,
    AccessKey: AccessKeys.Coupons,
    Type: "read",
    Name: "Coupons",
  },

  {
    path: "/coupons/:coupon",
    element: <AddCoupon />,
    AccessKey: AccessKeys.Coupons,
    Type: "write",
    Name: "Coupons",
  },

  {
    path: "/religions",
    element: <Religions />,
    AccessKey: AccessKeys.Religions,
    Type: "read",
    Name: "Caste & Communities",
  },

  {
    path: "/religions/:religion",
    element: <AddReligion />,
    AccessKey: AccessKeys.Religions,
    Type: "write",
    Name: "Caste & Communities",
  },

  {
    path: "/caste",
    element: <Casts />,
    AccessKey: AccessKeys.Casts,
    Type: "read",
    Name: "Caste & Communities",
  },

  {
    path: "/caste/:caste",
    element: <AddCast />,
    AccessKey: AccessKeys.Casts,
    Type: "write",
    Name: "Caste & Communities",
  },

  {
    path: "/subcaste",
    element: <Subcast />,
    AccessKey: AccessKeys.Subcast,
    Type: "read",
    Name: "Caste & Communities",
  },

  {
    path: "/subcaste/:subcast",
    element: <AddSubcast />,
    AccessKey: AccessKeys.Subcast,
    Type: "write",
    Name: "Caste & Communities",
  },

  {
    path: "/qualificationCategory",
    element: <QCateggorys />,
    AccessKey: AccessKeys.QCateggorys,
    Type: "read",
    Name: "Career & Education",
  },

  {
    path: "/qualificationCategory/:qCategory",
    element: <AddCategory />,
    AccessKey: AccessKeys.QCateggorys,
    Type: "write",
    Name: "Career & Education",
  },

  {
    path: "/qualification",
    element: <Qualifications />,
    AccessKey: AccessKeys.Qualifications,
    Type: "read",
    Name: "Career & Education",
  },

  {
    path: "/qualification/:qualification",
    element: <AddQualification />,
    AccessKey: AccessKeys.Qualifications,
    Type: "write",
    Name: "Career & Education",
  },

  {
    path: "/pCategory",
    element: <Pcategorys />,
    AccessKey: AccessKeys.Pcategorys,
    Type: "read",
    Name: "Career & Education",
  },

  {
    path: "/pCategory/:pCategory",
    element: <AddPcategory />,
    AccessKey: AccessKeys.Pcategorys,
    Type: "write",
    Name: "Career & Education",
  },

  {
    path: "/profession",
    element: <Professions />,
    AccessKey: AccessKeys.Professions,
    Type: "read",
    Name: "Career & Education",
  },

  {
    path: "/profession/:profession",
    element: <AddProfession />,
    AccessKey: AccessKeys.Professions,
    Type: "write",
    Name: "Career & Education",
  },

  {
    path: "/banners",
    element: <Banners />,
    AccessKey: AccessKeys.Banners,
    Type: "read",
    Name: "Banners",
  },

  {
    path: "/banners/:banner",
    element: <AddBanner />,
    AccessKey: AccessKeys.Banners,
    Type: "write",
    Name: "Banners",
  },

  {
    path: "/locations",
    element: <Locations />,
    AccessKey: AccessKeys.Locations,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/locations/:location",
    element: <AddLocation />,
    AccessKey: AccessKeys.Locations,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/state",
    element: <States />,
    AccessKey: AccessKeys.States,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/state/:state",
    element: <AddState />,
    AccessKey: AccessKeys.States,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/city",
    element: <Citys />,
    AccessKey: AccessKeys.Citys,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/city/:city",
    element: <AddCity />,
    AccessKey: AccessKeys.States,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/languages",
    element: <Languages />,
    AccessKey: AccessKeys.Languages,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/languages/:language",
    element: <AddLanguage />,
    AccessKey: AccessKeys.Languages,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/weight",
    element: <Weights />,
    AccessKey: AccessKeys.Weights,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/weight/:weight",
    element: <AddWeight />,
    AccessKey: AccessKeys.Weights,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/height",
    element: <Heights />,
    AccessKey: AccessKeys.Heights,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/height/:height",
    element: <AddHeight />,
    AccessKey: AccessKeys.Heights,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/payments",
    element: <Payments />,
    AccessKey: AccessKeys.PropTypes,
    Type: "read",
    Name: "Payments",
  },

  // {
  //   path: "/hobbys/:hobby",
  //   element: <AddHoby />,
  //   AccessKey: AccessKeys.Hobbys,
  //   Type: "write",
  // },

  {
    path: "/income",
    element: <Income />,
    AccessKey: AccessKeys.Income,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/income/:income",
    element: <AddIncome />,
    AccessKey: AccessKeys.Income,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/hobbies",
    element: <Hobbies />,
    AccessKey: AccessKeys.Hobbies,
    Type: "read",
    Name: "Personal Information",
  },

  {
    path: "/hobbies/:hobbie",
    element: <AddHobbies />,
    AccessKey: AccessKeys.Hobbies,
    Type: "write",
    Name: "Personal Information",
  },

  {
    path: "/notifications",
    element: <Notification />,
    AccessKey: AccessKeys.Notification,
    Type: "read",
    Name: "Notifications",
  },
  {
    path: "/settings",
    element: <Settings />,
    AccessKey: AccessKeys.Settings,
    Type: "read",
    Name: "Settings",
  },
  {
    path: "/settings/update",
    element: <ConfigUpdate />,
    AccessKey: AccessKeys.Settings,
    Type: "write",
    Name: "Settings",
  },
];
