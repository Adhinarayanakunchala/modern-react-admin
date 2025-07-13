
import { Error_Dark } from "./Util/Toast";
const httpcall = (url, method, body, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
        method: method,

        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...token,
        },
    })
        .then((response) => response.json())
        .then((res) => {
            if (res.Status === 0) {
                if (
                    res.Message === "Invalid Token" ||
                    res.Message === "unauthorized adminuser" ||
                    res.Message === "Token expired"
                ) {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = "/";
                    Error_Dark("Token Expired");
                }
            }
            return res;
        });
};


const Fhttpcall = (url, method, body, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
        method: method,
        body: body, // Sending the FormData as the body
        headers: {
            ...token,  // No need for Content-type header, as it's handled by FormData
        },
    })
        .then((response) => response.json())
        .then((res) => {
            if (res.Status === 0) {
                if (
                    res.Message === "Invalid Token" ||
                    res.Message === "unauthorized adminuser" ||
                    res.Message === "Token expired"
                ) {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = "/";
                    Error_Dark("Token Expired");
                }
            }
            return res;
        });
};

const Login = (method, body) => {
    return httpcall("Admin/login", method, body);
};

//--------------------------- Users--------------------


const Users = (method, body, token) => {
    return httpcall("Admin/list_users", method, body, token);
};

const AddUser = (method, body, token) => {
    return httpcall("Admin/add_user_details", method, body, token);
};


const UserById = (method, body, token) => {
    return httpcall(`Admin/list_users_by_id`, method, body, token);
};

const EditById = (method, body, token) => {
    return httpcall(`Admin/list_duplicate_users_by_id`, method, body, token);
};

const EditUser = (method, body, token, id) => {
    return httpcall(`Admin/userupdate/${id}`, method, body, token);
};
// Plans------------------------------
const Plans = (method, body, token) => {
    return httpcall("Admin/list_premiumplans", method, body, token);
};


const PlanById = (method, body, token, Id) => {
    return httpcall(`Admin/list_premium_plan_by_id?PremiumPlanID=${Id}`, method, body, token);
};

const EditPlan = (method, body, token, Id) => {
    return httpcall(`Admin/update_premiumplans/${Id}`, method, body, token);
};

const AddPlan = (method, body, token) => {
    return httpcall(`Admin/add_premium_plans`, method, body, token);
};

const DeletePlan = (method, body, token, Id) => {
    return httpcall(`Admin/delete_premiumplan/${Id}`, method, body, token);
};

// Coupons------------------------------
const Coupons = (method, body, token) => {
    return httpcall("Admin/list_coupons", method, body, token);
};


const CouponById = (method, body, token, Id) => {
    return httpcall(`Admin/list_coupon_plan_by_id?CouponCodeID=${Id}`, method, body, token);
};

const EditCoupon = (method, body, token, Id) => {
    return httpcall(`Admin/update_coupons/${Id}`, method, body, token);
};

const AddCoupon = (method, body, token) => {
    return httpcall(`Admin/add_coupons`, method, body, token);
};

const DeleteCoupon = (method, body, token, Id) => {
    return httpcall(`Admin/delete_coupons/${Id}`, method, body, token);
};

// Religion------------------------------
const Religions = (method, body, token) => {
    return httpcall("Admin/list_religion", method, body, token);
};


const ReligionById = (method, body, token, Id) => {
    return httpcall(`Admin/list_religion_by_id?ReligionID=${Id}`, method, body, token);
};

const EditReligion = (method, body, token, Id) => {
    return httpcall(`Admin/update_religion/${Id}`, method, body, token);
};

const AddReligion = (method, body, token) => {
    return httpcall(`Admin/add_religion`, method, body, token);
};

const DeleteReligion = (method, body, token, Id) => {
    return httpcall(`Admin/delete_religion/${Id}`, method, body, token);
};


// Cast------------------------------
const Cast = (method, body, token) => {
    return httpcall("Admin/list_caste", method, body, token);
};


const CastById = (method, body, token, Id) => {
    return httpcall(`Admin/list_caste_by_id?CasteID=${Id}`, method, body, token);
};

const EditCast = (method, body, token, Id) => {
    return httpcall(`Admin/update_caste/${Id}`, method, body, token);
};

const AddCast = (method, body, token) => {
    return httpcall(`Admin/add_caste`, method, body, token);
};

const DeleteCast = (method, body, token, Id) => {
    return httpcall(`Admin/delete_caste/${Id}`, method, body, token);
};


// Subcast------------------------------
const Subcast = (method, body, token) => {
    return httpcall("Admin/list_subcaste", method, body, token);
};


const SubcastById = (method, body, token, Id) => {
    return httpcall(`Admin/list_subcaste_by_id?SubCasteID=${Id}`, method, body, token);
};

const EditSubcast = (method, body, token, Id) => {
    return httpcall(`Admin/update_subcaste/${Id}`, method, body, token);
};

const AddSubcast = (method, body, token) => {
    return httpcall(`Admin/add_subcaste`, method, body, token);
};

const DeleteSubcast = (method, body, token, Id) => {
    return httpcall(`Admin/delete_subcaste/${Id}`, method, body, token);
};


// Qualification Category------------------------------
const QCategorys = (method, body, token) => {
    return httpcall("Admin/list_qualificationcategories", method, body, token);
};


const QCategorysById = (method, body, token, Id) => {
    return httpcall(`Admin/list_qualificationcategories_by_id?Qualification_CategoryID=${Id}`, method, body, token);
};

const EditQCategory = (method, body, token, Id) => {
    return httpcall(`Admin/update_qualificationcategories/${Id}`, method, body, token);
};

const AddQCategory = (method, body, token) => {
    return httpcall(`Admin/add_qualificationcategories`, method, body, token);
};

const DeleteQCategory = (method, body, token, Id) => {
    return httpcall(`Admin/delete_qualificationcategories/${Id}`, method, body, token);
};



// Qualifications------------------------------
const Qualifications = (method, body, token) => {
    return httpcall("Admin/list_qualifications", method, body, token);
};


const QualificationById = (method, body, token, Id) => {
    return httpcall(`Admin/list_qualifications_by_id?QualificationID=${Id}`, method, body, token);
};

const EditQualification = (method, body, token, Id) => {
    return httpcall(`Admin/update_qualifications/${Id}`, method, body, token);
};

const AddQualification = (method, body, token) => {
    return httpcall(`Admin/add_qualifications`, method, body, token);
};

const DeleteQualification = (method, body, token, Id) => {
    return httpcall(`Admin/delete_qualifications/${Id}`, method, body, token);
};


// Profissinal Categorys------------------------------
const PCategorys = (method, body, token) => {
    return httpcall("Admin/list_professions_categories", method, body, token);
};


const PCategoryById = (method, body, token, Id) => {
    return httpcall(`Admin/list_profession_categories_by_id?Profession_CategoryID=${Id}`, method, body, token);
};

const EditPCategory = (method, body, token, Id) => {
    return httpcall(`Admin/update_professions_categories/${Id}`, method, body, token);
};

const AddPCategory = (method, body, token) => {
    return httpcall(`Admin/add_professions_categories`, method, body, token);
};

const DeletePCategory = (method, body, token, Id) => {
    return httpcall(`Admin/delete_professions_categories/${Id}`, method, body, token);
};


// Profissinal ------------------------------
const Professions = (method, body, token) => {
    return httpcall("Admin/list_professions", method, body, token);
};


const ProfessionById = (method, body, token, Id) => {
    return httpcall(`Admin/list_professions_by_id?ProfessionID=${Id}`, method, body, token);
};

const EditProfession = (method, body, token, Id) => {
    return httpcall(`Admin/update_professions/${Id}`, method, body, token);
};

const AddProfession = (method, body, token) => {
    return httpcall(`Admin/add_professions`, method, body, token);
};

const DeleteProfession = (method, body, token, Id) => {
    return httpcall(`Admin/delete_professions/${Id}`, method, body, token);
};

// Banners--------------------------------------

const Banners = (method, body, token, Type) => {
    return httpcall(`Admin/list_banners?PageType=${Type}`, method, body, token);
};

const BannerById = (method, body, token, Id) => {
    return httpcall(`Admin/list_banners_by_id?BannerID=${Id}`, method, body, token);
};

const EditBanner = (method, body, token, Id) => {
    return httpcall(`Admin/update_banners/${Id}`, method, body, token);
};

const AddBanner = (method, body, token) => {
    return httpcall(`Admin/add_banners`, method, body, token);
};

const DeleteBanner = (method, body, token) => {
    return httpcall(`Admin/remove_banner`, method, body, token);
};


//Locations ------------------------------
const Locations = (method, body, token) => {
    return httpcall("Admin/list_locations", method, body, token);
};


const LocationById = (method, body, token, Id) => {
    return httpcall(`Admin/list_locations_by_id?LocationID=${Id}`, method, body, token);
};

const EditLocation = (method, body, token, Id) => {
    return httpcall(`Admin/update_locations/${Id}`, method, body, token);
};

const AddLocation = (method, body, token) => {
    return httpcall(`Admin/add_locations`, method, body, token);
};

const DeleteLocation = (method, body, token, Id) => {
    return httpcall(`Admin/delete_locations/${Id}`, method, body, token);
};


//Weights ------------------------------
const Weights = (method, body, token) => {
    return httpcall("Admin/list_weights", method, body, token);
};


const WeightById = (method, body, token, Id) => {
    return httpcall(`Admin/list_weights_by_id?WeightID=${Id}`, method, body, token);
};

const EditWeight = (method, body, token, Id) => {
    return httpcall(`Admin/update_weight/${Id}`, method, body, token);
};

const AddWeight = (method, body, token) => {
    return httpcall(`Admin/add_weights`, method, body, token);
};

const DeleteWeight = (method, body, token, Id) => {
    return httpcall(`admin/delete_weights/${Id}`, method, body, token);
};


//Heights ------------------------------
const Heights = (method, body, token) => {
    return httpcall("Admin/list_height", method, body, token);
};

const AddHeight = (method, body, token) => {
    return httpcall(`Admin/add_height`, method, body, token);
};

const EditHeight = (method, body, token, Id) => {
    return httpcall(`admin/update_height/${Id}`, method, body, token);
};

const DeleteHeight = (method, body, token, Id) => {
    return httpcall(`admin/delete_height/${Id}`, method, body, token);
};


//Income ------------------------------
const Income = (method, body, token) => {
    return httpcall("Admin/list_income", method, body, token);
};

const IncomeById = (method, body, token, Id) => {
    return httpcall(`Admin/list_income_by_id?IncomeID=${Id}`, method, body, token);
};

const EditIncome = (method, body, token, Id) => {
    return httpcall(`Admin/update_income/${Id}`, method, body, token);
};

const AddIncome = (method, body, token) => {
    return httpcall(`Admin/add_income`, method, body, token);
};

const DeleteIncome = (method, body, token, Id) => {
    return httpcall(`Admin/delete_income/${Id}`, method, body, token);
};


//Hobbies  categorys------------------------------
const Hobbys = (method, body, token) => {
    return httpcall("Admin/list_hobby_category", method, body, token);
};

const HobbyById = (method, body, token, Id) => {
    return httpcall(`Admin/list_hobby_category_by_id?Hobbie_CategoryID=${Id}`, method, body, token);
};

const Edithoby = (method, body, token, Id) => {
    return httpcall(`Admin/update_hobby_category/${Id}`, method, body, token);
};

const Addhoby = (method, body, token) => {
    return httpcall(`Admin/add_hobby_category`, method, body, token);
};

const Deletehoby = (method, body, token, Id) => {
    return httpcall(`Admin/delete_hobby_category/${Id}`, method, body, token);
};

// Hobbies -------------------------------------------

const Hobbies = (method, body, token) => {
    return httpcall("Admin/list_hobby", method, body, token);
};

const HobbiesById = (method, body, token, Id) => {
    return httpcall(`Admin/list_hobby_by_id?HobbieID=${Id}`, method, body, token);
};

const EditHobbie = (method, body, token, Id) => {
    return httpcall(`Admin/update_hobby/${Id}`, method, body, token);
};

const AddHobbie = (method, body, token) => {
    return httpcall(`Admin/add_hobby`, method, body, token);
};

const DeleteHobbie = (method, body, token, Id) => {
    return httpcall(`Admin/delete_hobby/${Id}`, method, body, token);
};

// Documents  Status

const DocumentStatuses = (method, body, token, Id) => {
    return httpcall(`Admin/approve_reject_document/${Id}`, method, body, token);
}

const AdminApprove = (method, body, token, Id) => {
    return httpcall(`Admin/userstatus/${Id}`, method, body, token);
}

const DocumentsApprove = (method, body, token, Id) => {
    return httpcall(`Admin/update_doc_by_user/${Id}`, method, body, token);
}


const DeleteUser = (method, body, token) => {
    return httpcall(`Admin/delete_user`, method, body, token);
}

const TabsFilter = (method, body, token, Type, page, size) => {
    return httpcall(`Admin/list_different_users?Type=${Type}&page=${page}&size=${size}`, method, body, token);
}

const UsersSearch = (method, body, token, Type, page, size) => {
    return httpcall(`Admin/search?Type=${Type}&page=${page}&size=${size}`, method, body, token);
}

// Payments
const Payments = (method, body, token) => {
    return httpcall("Admin/paymentdetails", method, body, token);
};

// Send Notifications
const Sendnotifications = (method, body, token) => {
    return httpcall("Admin/notifications", method, body, token);
};

const ChartsData = (method, body, token) => {
    return httpcall("Admin/dashboard", method, body, token);
};
const ChartsData2 = (method, body, token) => {
    return httpcall("Admin/usersbycategory", method, body, token);
};

const Dropdowndata = (method, body, token) => {
    return httpcall("Admin/dropdowndata", method, body, token);
};

const ReportedUsers = (method, body, token) => {
    return httpcall("Admin/reported_users", method, body, token);
};

//  Premium plans

const getPremiumPlans = (method, body, token) => {
    return httpcall("Admin/get_premium_plans", method, body, token);
};

const AddPremium = (method, body, token) => {
    return httpcall("Admin/add_user_plan", method, body, token);
};

const UpgradePremium = (method, body, token) => {
    return httpcall("Admin/update_user_plan", method, body, token);
};

const DeletePremium = (method, body, token) => {
    return httpcall("Admin/remove_user_plan", method, body, token);
};


const getPlan = (method, body, token) => {
    return httpcall("Admin/get_user_plan", method, body, token);
};

// States  
const getStates = (method, body, token) => {
    return httpcall("admin/list_state", method, body, token);
};

const AddState = (method, body, token) => {
    return httpcall("admin/add_state", method, body, token);
};

const EditState = (method, body, token, Id) => {
    return httpcall(`admin/update_state/${Id}`, method, body, token);
};
const DeleteState = (method, body, token, Id) => {
    return httpcall(`admin/delete_state/${Id}`, method, body, token);
};

// States  
const getCitys = (method, body, token) => {
    return httpcall("admin/list_city", method, body, token);
};

const AddCity = (method, body, token) => {
    return httpcall("admin/add_city", method, body, token);
};

const EditCity = (method, body, token, Id) => {
    return httpcall(`admin/update_city/${Id}`, method, body, token);
};

const DeleteCity = (method, body, token, Id) => {
    return httpcall(`admin/delete_city/${Id}`, method, body, token);
};

// Languages 
const Languages = (method, body, token) => {
    return httpcall("admin/list_language", method, body, token);
};

const AddLanguage = (method, body, token) => {
    return httpcall("admin/add_language", method, body, token);
};

const EditLanguage = (method, body, token, Id) => {
    return httpcall(`admin/update_language/${Id}`, method, body, token);
};

const DeleteLanguage = (method, body, token, Id) => {
    return httpcall(`admin/delete_language/${Id}`, method, body, token);
};

const ActiveAllUsers = (method, body, token) => {
    return httpcall("Admin/activate_users", method, body, token);
}

// For Uplaoding Images 

const UplaodImage = (method, body, token) => {
    return Fhttpcall("admin/upload-image", method, body, token);
}

// Credits

const UserCredits = (method, body, token, userId, size, page) => {
    return httpcall(`admin/get_credit_history?UserID=${userId}&Size=${size}&Page=${page}`, method, body, token);
};

//  Role based Access

const AdminAccounts = (method, body, token) => {
    return httpcall(`admin/admin_accounts`, method, body, token);
}

const AdminAccountById = (method, body, token, Id) => {
    return httpcall(`admin/admin_account/${Id}`, method, body, token);
}

const Roles = (method, body, token) => {
    return httpcall(`admin/list_admin_roles`, method, body, token)
}

const createAdmin = (method, body, token) => {
    return httpcall(`admin/create_admin_account`, method, body, token);
}

const updateAdmin = (method, body, token, Id) => {
    return httpcall(`admin/update_admin_account/${Id}`, method, body, token);
}

const DeleteAdmin = (method, body, token, Id) => {
    return httpcall(`admin/delete_admin_account/${Id}`, method, body, token);
}


// Admin Permissions

const AdminPermissions = (method, body, token) => {
    return httpcall(`admin/admin_roles`, method, body, token);
}
const createRole = (method, body, token) => {
    return httpcall(`admin/create_admin_role`, method, body, token);
}

const EditPermissions = (method, body, token, Id) => {
    return httpcall(`admin/update_admin_role/${Id}`, method, body, token);
}
const getRolePermissions = (method, body, token, id) => {
    return httpcall(`admin/admin_role/${id}`, method, body, token);
}

const DeletePermissions = (method, body, token, Id) => {
    return httpcall(`admin/delete_admin_role/${Id}`, method, body, token);
}

const DefaultPremissions = (method, body, token) => {
    return httpcall(`admin/admin_permissions`, method, body, token);
}

// Settings
const Settings = (method, body, token) => {
    return httpcall("admin/settings", method, body, token);
};

const EditSettings = (method, body, token, id) => {
    return httpcall(`admin/setting/${id}`, method, body, token);
}

const EditSettingsById = (method, body, token, id) => {
    return httpcall(`admin/setting/${id}`, method, body, token);
}

export const Services = {
    Login,
    UplaodImage,

    ChartsData,
    ChartsData2,

    Users,
    AddUser,
    UserById,
    EditById,
    EditUser,
    UsersSearch,

    Plans,
    PlanById,
    EditPlan,
    AddPlan,
    DeletePlan,

    Coupons,
    CouponById,
    EditCoupon,
    AddCoupon,
    DeleteCoupon,

    Religions,
    ReligionById,
    EditReligion,
    AddReligion,
    DeleteReligion,

    Cast,
    CastById,
    EditCast,
    AddCast,
    DeleteCast,

    Subcast,
    SubcastById,
    EditSubcast,
    AddSubcast,
    DeleteSubcast,

    QCategorys,
    QCategorysById,
    EditQCategory,
    AddQCategory,
    DeleteQCategory,


    Qualifications,
    QualificationById,
    EditQualification,
    AddQualification,
    DeleteQualification,

    PCategorys,
    PCategoryById,
    EditPCategory,
    AddPCategory,
    DeletePCategory,

    Professions,
    ProfessionById,
    EditProfession,
    AddProfession,
    DeleteProfession,

    Banners,
    BannerById,
    EditBanner,
    AddBanner,
    DeleteBanner,

    Locations,
    LocationById,
    EditLocation,
    AddLocation,
    DeleteLocation,

    Weights,
    WeightById,
    EditWeight,
    AddWeight,
    DeleteWeight,

    Heights,
    AddHeight,
    EditHeight,
    DeleteHeight,

    Income,
    IncomeById,
    EditIncome,
    AddIncome,
    DeleteIncome,

    Hobbys,
    HobbyById,
    Edithoby,
    Addhoby,
    Deletehoby,

    Hobbies,
    HobbiesById,
    EditHobbie,
    AddHobbie,
    DeleteHobbie,

    DocumentStatuses,
    AdminApprove,
    DeleteUser,
    TabsFilter,
    Payments,

    Sendnotifications,
    Dropdowndata,
    DocumentsApprove,
    ReportedUsers,

    getPremiumPlans,
    getPlan,
    AddPremium,
    UpgradePremium,
    DeletePremium,

    // States  
    getStates,
    AddState,
    EditState,
    DeleteState,
    // Citys

    getCitys,
    AddCity,
    EditCity,
    DeleteCity,
    //  Languages

    Languages,
    AddLanguage,
    EditLanguage,
    DeleteLanguage,

    //  Active All users 
    ActiveAllUsers,

    UserCredits,

    AdminAccounts,
    AdminAccountById,
    Roles,
    createAdmin,
    updateAdmin,
    DeleteAdmin,

    //  Admin Permissions
    AdminPermissions,
    EditPermissions,
    DeletePermissions,
    getRolePermissions,
    DefaultPremissions,
    createRole,

    // Settings
    Settings,
    EditSettings,
    EditSettingsById,
};

