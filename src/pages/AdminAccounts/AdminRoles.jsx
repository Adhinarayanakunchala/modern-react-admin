
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import { MdDelete } from "react-icons/md";

function AdminRoles() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Admin Accounts")[0];
    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate('/forbidden')
        }
    }, []);

    const getAllCategories = () => {
        Services.AdminAccounts("POST", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response?.Status === 1) {
                    setData(response?.AdminUsers);
                } else if (response.Status === 0) {
                    warningSwal("Warning", response?.Message);
                }
            })
            .catch((err) => {
                setLoading(false);
                alert("something went wrong please try again");
                console.log(err);
            });
    };

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanEdit === 1) {
            Navigate(`/manageadmin/Update?id=${id}`);
        } else {
            warningSwal("Unauthorized !", " Please contact the admin.");
        }
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanDelete === 1) {
            try {
                const res = await Services.DeleteAdmin("DELETE", null, token, id)
                if (res.Status === 1) {
                    SuccessSwal("Account Deleted", res?.Message);
                    getAllCategories(1);
                } else if (res.Status === 0) {
                    warningSwal("Warning", res?.Message);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                Error(err?.response?.data?.Message);
            }
        } else {
            warningSwal("Unauthorized !", " Please contact the admin.");
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Id", "Name", "Role NAme", "Mobile Number", "Email", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Admin ID</th>
                                <th>Admin Name</th>
                                <th>Role Name</th>
                                <th>Mobile Number</th>
                                <th>Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr id={item?.AdminUserID}>
                                    <td>{item?.AdminUserID}</td>
                                    <td>{item?.FirstName}{item?.LastName}</td>
                                    <td>{item?.AdminRoleName}</td>
                                    <td>{item?.MobileNumber}</td>
                                    <td>{item?.EmailID}</td>
                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Action-btns"]
                                            }>
                                            <button
                                                id={item?.AdminUserID}
                                                onClick={editHandler}>
                                                <FaRegEdit />
                                            </button>
                                            <button
                                                id={item?.AdminUserID}
                                                onClick={deleteHandler}>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    {" "}
                    <p>No Accounts Found</p>
                </div>
            )}
        </>
    );
}

export default AdminRoles;
