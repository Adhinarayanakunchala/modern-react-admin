import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";

import AdminRoles from "./AdminRoles";
import { warningSwal } from "Util/Toast";

function Tutor() {
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Admin Accounts")[0];

    const handleAdd = () => {
        if (filteredItems?.CanWrite === 1) {
            Navigate("/manageadmin/add");
        } else {
            Navigate("/forbidden");
        }
    }
    return (
        <Layout Active={"Manage Admin"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin Accounts</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["control-btns"]}>
                    <button
                        className={CommonClasses["button"]}
                        onClick={handleAdd}>
                        <BiPlus size={20} /> Create New Admin
                    </button>
                </div>
                <div className={CommonClasses["wrapper"]}>
                    <h3>Admin Accounts</h3>
                    <AdminRoles />
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;
