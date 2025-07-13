import Layout from 'Components/Layout'
import React, { useEffect, useState } from 'react'
import TutorClasses from '../Banners/AddBanner/index.module.css'
import Styles from './Style.module.css'
import { Services } from '../../Services'
import { Helmet } from 'react-helmet'
import { Error, SuccessSwal, warningSwal } from 'Util/Toast'
import { useNavigate } from 'react-router-dom';

const AddPermissions = () => {
    const Navigate = useNavigate();
    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [loading, setLoading] = useState(true);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Role Management")[0];

    useEffect(() => {
        if (filteredItems?.CanWrite === 1 || filteredItems?.CanEdit === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);

    useEffect(() => {
        const getDefault = async () => {
            setLoading(true);
            try {
                const res = await Services.DefaultPremissions("GET", null, token);
                if (res?.Status === 1) {
                    setLoading(false);
                    setPermissions(res?.Permissions);
                } else if (res?.Status === 0) {
                    setLoading(false);
                    Error(res?.Message);
                }
            } catch (err) {
                setLoading(false);
                Error(err?.response?.Message);
            }
        }
        getDefault();
    }, []);

    const handleCheckboxChange = (pageId, field) => {
        setPermissions((prev) =>
            prev.map((permission) =>
                permission.PageID === pageId
                    ? { ...permission, [field]: permission[field] ? 0 : 1 }
                    : permission
            )
        );
    };

    const hnadleSubmit = async () => {
        let body = {
            AdminRoleName: roleName || '',
            Permissions: permissions.map(({ PageID, CanRead, CanWrite, CanEdit, CanDelete }) => ({
                PageID,
                CanRead,
                CanWrite,
                CanEdit,
                CanDelete,
            })),
        }
        console.log(body);
        try {
            const res = await Services.createRole("POST", JSON.stringify(body), token);
            if (res?.Status === 1) {
                setRoleName("");
                setPermissions([]);
                SuccessSwal("Success", res?.Message);

            } else if (res?.Status === 0) {
                Error(res?.Message);
            }
        } catch (err) {
            Error(err?.response?.data?.Message);
        }
    };

    const backButton = () => {
        Navigate(-1);
    };
    return (
        <Layout Active={"Permissions"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Role</title>
            </Helmet>
            {/* {mainLoad && <MainLoader />} */}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>Create Role</h3>
                    <div className={Styles["form_grid"]}>
                        <label htmlFor="name">Role Name</label>
                        <input
                            type="text"
                            placeholder='Role Name'
                            value={roleName || ""}
                            onChange={(e) => setRoleName(e.target.value)}
                        />
                    </div>
                    <div className={Styles["Table"]}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Read</th>
                                    <th>Write</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((item) => (
                                    <tr key={item?.PageID}>
                                        <td>{item?.PageName}</td>

                                        <td> <input
                                            className={Styles["checkbox"]}
                                            type="checkbox"
                                            checked={item.CanRead === 1}
                                            onChange={() => handleCheckboxChange(item.PageID, "CanRead")}
                                        />
                                        </td>
                                        <td> <input
                                            className={Styles["checkbox"]}
                                            type="checkbox"
                                            checked={item.CanWrite === 1}
                                            onChange={() => handleCheckboxChange(item.PageID, "CanWrite")}
                                        />
                                        </td>
                                        <td><input
                                            className={Styles["checkbox"]}
                                            type="checkbox"
                                            checked={item.CanEdit === 1}
                                            onChange={() => handleCheckboxChange(item.PageID, "CanEdit")}
                                        />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <input
                                                className={Styles["checkbox"]}
                                                type="checkbox"
                                                checked={item.CanDelete === 1}
                                                onChange={() => handleCheckboxChange(item.PageID, "CanDelete")}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={Styles["btn_wrapper"]}>
                            <button type="submit" className={Styles["add_bt"]} onClick={hnadleSubmit}>Submit</button>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddPermissions