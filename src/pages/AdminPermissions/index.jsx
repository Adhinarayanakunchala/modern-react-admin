import { Helmet } from "react-helmet";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Layout from "Components/Layout/index";
import CommonClasses from "Styles/Common.module.css";

import Permissions from "./Permissions";
import { useEffect, useState } from "react";
import { warningSwal } from "Util/Toast";
import { Services } from "Services";

function Tutor() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    useEffect(() => {
        fetchRoles();
    }, [])
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Role Management")[0];

    const fetchRoles = async () => {
        try {
            const response = await Services.AdminPermissions("GET", null, token);

            if (response?.Status === 1) {
                const roles = response?.AdminRoles || [];
                setRoles(roles);

                if (roles.length > 0) {
                    setSelectedRoleId(roles[0].AdminRoleID);
                }
            } else if (response.Status === 0) {
                warningSwal("Warning", response?.Message);
            }
        } catch (err) {
            console.error("Error fetching roles:", err);
            warningSwal("Error", "Something went wrong. Please try again.");
        }
    };

    const handleRoleChange = (e) => {
        const roleId = parseInt(e.target.value);
        setSelectedRoleId(roleId);
    };

    const hanandleAdd = () => {
        if (filteredItems.CanWrite === 1) {
            navigate("/permissions/add")
        } else {
            navigate("/forbidden");
        }
    };

    const selectedRole = roles.find(role => role.AdminRoleID === selectedRoleId) || null;

    return (
        <Layout Active={"Permissions"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Permissions</title>
            </Helmet>
            <div className={CommonClasses["Container"]}>
                <div className={CommonClasses["control-btns"]}>
                    <button
                        className={CommonClasses["button"]}
                        onClick={hanandleAdd}
                    >
                        <BiPlus size={20} /> Create New Role
                    </button>

                    <div className={CommonClasses["form_grid"]}>
                        <select
                            id="roles"
                            onChange={handleRoleChange}
                            value={selectedRoleId || ""}
                        >
                            <option value="" disabled>Select Role</option>
                            {roles.map((role) => (
                                <option
                                    key={role.AdminRoleID}
                                    value={role.AdminRoleID}
                                >
                                    {role.AdminRoleName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={CommonClasses["wrapper"]}>
                    <h3>Permissions</h3>
                    {selectedRole && (
                        <Permissions
                            selectedRole={selectedRole}
                            id={selectedRoleId}
                            getRoles={fetchRoles}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Tutor;