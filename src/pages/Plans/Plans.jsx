import Moment from "react-moment";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import parse from 'html-react-parser';

function Plans() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Plans")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const getAllCategories = () => {
        Services.Plans("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.PremiumPlans);
                } else if (response.Status === 0) {
                    warningSwal("Warning", response.Message);
                }
            })
            .catch((err) => {
                setLoading(false);
                // alert(err);
                alert("something went wrong please try again");
                console.log(err);
            });
    };
    useEffect(() => {
        getAllCategories(1);
    }, []);
    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        Navigate(`/plans/update?id=${id}`);
    };


    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        try {
            const res = await Services.DeletePlan("PUT", null, token, id)
            if (res.Status === 1) {
                SuccessSwal("Plan Deleted", res.Message);
                getAllCategories(1);

            } else if (res.Status === 0) {
                warningSwal("Warning", res.Message);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);

        }
    };

    // const logHandler = (e) => {
    //     let id = e.currentTarget.getAttribute("id");
    //     let name = e.currentTarget.getAttribute("name");
    //     Navigate("/ActivityLog", {
    //         state: {
    //             Active: "Categories",
    //             ActionByType: 9,
    //             ActionFor: id,
    //             name: name,
    //             Page: "Categories",
    //         },
    //     });
    // };
    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Name", "Description", "Cost", "Validity", "Credits", "Priority", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Description</th>
                                <th>Cost</th>
                                <th>validity</th>
                                <th>Credits</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr

                                    id={item.PremiumPlanID}>

                                    <td>{item.PlanName}</td>
                                    <td>{parse(item.PlanDescription)}</td>
                                    <td>₹{item.PlanCost}</td>
                                    <td>{item.Validity}{" months"}</td>
                                    <td>{item.Credits}</td>
                                    <td>{item.Priority}</td>
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
                                                id={item.PremiumPlanID}
                                                onClick={editHandler}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                id={item.PremiumPlanID}
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
                    <p>No Plans Found</p>
                </div>
            )}
        </>
    );
}

export default Plans;
