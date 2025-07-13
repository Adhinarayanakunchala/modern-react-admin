import Moment from "react-moment";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import moment from "moment";
import { MdDelete } from "react-icons/md";

function Qualifications() {
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
    const getAllCategories = () => {
        Services.Qualifications("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.Qualifications);
                } else if (response.Status === 0) {
                    warningSwal("Warning", response.Message);
                }
            })
            .catch((err) => {
                setLoading(false);
                alert("something went wrong please try again");
                console.log(err);
            });
    };
    // useEffect(() => {
    //     getAllCategories(1);
    // }, []);
    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        Navigate(`/qualification/Update?id=${id}`);
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        try {
            const res = await Services.DeleteQualification("PUT", null, token, id)
            if (res.Status === 1) {
                SuccessSwal("success", res.Message);
                getAllCategories(1);
            } else if (res.Status === 0) {
                warningSwal("warning", res.Message);
            }
        } catch (err) {
            console.log(err);
            warningSwal("Error", "Something went wrong");
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
                                <th>Qualification Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.QualificationID}
                                >
                                    <td>{item.Qualification_CategoryName}</td>
                                    <td>{item.QualificationName}</td>
                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Action-btns"]
                                            }>
                                            <button
                                                id={item.QualificationID}
                                                onClick={editHandler}>
                                                <FaRegEdit />
                                            </button>
                                            {/* <button
                                                id={item.QualificationID}
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
                    <p>No Qualifications Found</p>
                </div>
            )}
        </>
    );
}

export default Qualifications;
