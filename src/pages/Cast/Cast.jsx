
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import moment from "moment";
import { MdDelete } from "react-icons/md";

function Casts() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Caste & Communities")[0];

    const getAllCategories = async () => {
        try {
            setLoading(true);
            const response = await Services.Cast("GET", null, token);
            setTimeout(() => {
                setLoading(false);
            }, 200);
            if (response.Status) {
                setData(response.Result);
                console.log(response);
            } else if (response.Status === 0) {
                warningSwal("Warning", response.Message);
            }

        } catch (err) {
            setLoading(false);
            // alert(err);
            alert("something went wrong please try again");
            console.log(err);
        };
    };
    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate("/forbidden");
        }
    }, []);

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        let RId = e.currentTarget.getAttribute("Rid");
        Navigate(`/caste/Update?ReliGionId=${RId}&id=${id}`);
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanDelete === 1) {
            try {
                const res = await Services.DeleteCast("PUT", null, token, id)
                if (res.Status === 1) {
                    SuccessSwal("Caste Deleted", res.Message);
                    getAllCategories(1);

                } else if (res.Status === 0) {
                    warningSwal("Warning", res.Message);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            Navigate("/forbidden");
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Religion", "Caste", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Religion</th>
                                <th>Caste</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.CasteID}
                                    RId={item.ReligionID}
                                >
                                    <td>{item.Religion}</td>
                                    <td>{item.Caste}</td>
                                    <td>
                                        {item.Status === 1 ? (
                                            <div
                                                className={
                                                    CommonClasses[
                                                    "Status-active"
                                                    ]
                                                }>
                                                <span>Active</span>
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    CommonClasses[
                                                    "Status-inactive"
                                                    ]
                                                }>
                                                <span>InActive</span>
                                            </div>

                                        )}
                                    </td>


                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Action-btns"]
                                            }>
                                            <button
                                                id={item.CasteID}
                                                RId={item.ReligionID}
                                                onClick={editHandler}>
                                                <FaRegEdit />
                                            </button>
                                            <button
                                                id={item.CasteID}
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
                    <p>No Castes Found</p>
                </div>
            )}
        </>
    );
}

export default Casts;
