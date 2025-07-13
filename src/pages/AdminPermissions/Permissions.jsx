
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal, Error } from "Util/Toast";
import Styles from './Style.module.css'
import Loader from "Components/loader/fallingLines";

function Permissions(props) {
    const Navigate = useNavigate();
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Role Management")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);

    useEffect(() => {
        if (props.id) {
            getPermissions();
        }
    }, [props.id]);

    const getPermissions = async () => {
        setLoading(true);
        try {
            const res = await Services.getRolePermissions("GET", null, token, props.id);
            if (res?.Status === 1) {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
                setPermissions(res?.AdminRole?.Permissions || []);
            } else if (res?.Status === 0) {
                setLoading(false);
                warningSwal("waring", res?.Message);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
            warningSwal("Error", err?.response?.Message);
        }
    };

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
            AdminRoleName: props?.selectedRole?.AdminRoleName,
            Permissions: permissions.map(({ PageID, CanRead, CanWrite, CanEdit, CanDelete }) => ({
                PageID,
                CanRead,
                CanWrite,
                CanEdit,
                CanDelete,
            })),
        }
        // console.log(body);
        try {
            const res = await Services.EditPermissions("PUT", JSON.stringify(body), token, props?.id);
            if (res?.Status === 1) {
                SuccessSwal("Success", res?.Message);
            } else if (res?.Status === 0) {
                Error(res?.Message);
            }
        } catch (err) {
            Error(err?.response?.data?.Message);
        }
    };

    const deleteHandler = async () => {

        try {
            const res = await Services.DeletePermissions("DELETE", null, token, props.id)
            if (res.Status === 1) {
                SuccessSwal("Role deletrd", res?.Message);
                props.getRoles();
            } else if (res.Status === 0) {
                warningSwal("Warning", res?.Message);
            }

        } catch (err) {
            console.log(err);
            props.setLoading(false);
            Error(err?.response?.Message);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={Styles["Table"]}>
                    {
                        props?.selectedRole && (
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
                                                type="checkbox"
                                                checked={item.CanRead === 1}
                                                onChange={() => handleCheckboxChange(item.PageID, "CanRead")}
                                            />
                                            </td>
                                            <td> <input
                                                type="checkbox"
                                                checked={item.CanWrite === 1}
                                                onChange={() => handleCheckboxChange(item.PageID, "CanWrite")}
                                            />
                                            </td>
                                            <td><input
                                                type="checkbox"
                                                checked={item.CanEdit === 1}
                                                onChange={() => handleCheckboxChange(item.PageID, "CanEdit")}
                                            />
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={item.CanDelete === 1}
                                                    onChange={() => handleCheckboxChange(item.PageID, "CanDelete")}
                                                />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>)}
                    <div className={Styles["btn_wrapper"]}>
                        {
                            filteredItems?.CanEdit === 1 &&
                            <button type="submit" className={Styles["add_bt"]} onClick={hnadleSubmit}>Update</button>
                        }
                        {
                            filteredItems?.CanDelete === 1 &&
                            <button type="button" className={Styles["del_bt"]} onClick={deleteHandler}>Delete</button>
                        }

                    </div>
                </div>
            )}
        </>
    );
}

export default Permissions;
