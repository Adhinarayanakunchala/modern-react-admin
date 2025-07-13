import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";



function Settings() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Settings")[0];


    const getAllCategories = () => {
        Services.Settings("GET", null, token,)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response?.Status === 1) {
                    setData(response?.Config);
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

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories();
        } else {
            Navigate("/forbidden")
        }
    }, []);

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanEdit === 1) {
            Navigate(`/settings/Update?id=${id}`);
        } else {
            warningSwal("Unauthorized !", " Please contact the admin.");
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Id", "ConfigKey", "ConfigValue", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ConfigKey</th>
                                <th>ConfigValue</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) => (
                                    <tr
                                        id={item.ConfigID}>
                                        <td>{item.ConfigID}</td>
                                        <td>{item.ConfigKey}</td>
                                        <td>{item.ConfigValue}</td>
                                        <td>
                                            <div
                                                className={
                                                    CommonClasses["Action-btns"]
                                                }>

                                                <button
                                                    id={item.ConfigID}
                                                    onClick={editHandler}>
                                                    <FaRegEdit />
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
                    <p>No Banners Found</p>
                </div>)
            }
        </>
    );
}

export default Settings;
