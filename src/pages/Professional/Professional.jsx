import Moment from "react-moment";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";

function Professions() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Career & Education")[0];
    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const getAllCategories = async () => {
        try {
            const response = await Services.Professions("GET", null, token)
            setTimeout(() => {
                setLoading(false);
            }, 200);
            if (response.Status === 1) {
                setData(response.Professions);
            } else if (response.Status === 0) {
                warningSwal("Warning", response.Message);
            }
        } catch (err) {
            setLoading(false);
            alert("something went wrong please try again");
            console.log(err);
        }
    };
    // useEffect(() => {
    //     getAllCategories(1);
    // }, []);
    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        Navigate(`/profession/Update?id=${id}`);
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        try {
            const res = await Services.DeleteProfession("PUT", null, token, id)
            if (res.Status === 1) {
                SuccessSwal("success", res.Message);
                getAllCategories(1);
            } else if (res.Status === 0) {
                warningSwal("warning", res.Message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["CategoryName", "Name", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>CategoryName</th>
                                <th>Profession Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.ProfessionID}
                                >
                                    <td>{item.Profession_CategoryName}</td>
                                    <td>{item.ProfessionName}</td>

                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Action-btns"]
                                            }>
                                            <button
                                                id={item.ProfessionID}
                                                onClick={editHandler}>
                                                <FaRegEdit />
                                            </button>
                                            {/* <button
                                                id={item.ProfessionID}
                                                onClick={deleteHandler}>
                                                <MdDelete />
                                            </button> */}
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
                    <p>No Professions Found</p>
                </div>
            )}
        </>
    );
}

export default Professions;
