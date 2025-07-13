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

function Coupons() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Coupons")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate("/forbidden");
        }
    }, []);
    
    const getAllCategories = () => {
        Services.Coupons("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.Coupons);
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

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        Navigate(`/coupons/update?id=${id}`);
    };


    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanDelete === 1) {
            try {
                const res = await Services.DeleteCoupon("PUT", null, token, id)
                // console.log(res)
                if (res.Status === 1) {
                    SuccessSwal("Coupon Deleted", res.Message);
                    getAllCategories(1);

                } else if (res.Status === 0) {
                    warningSwal("Warning", res.Message);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                warningSwal("Error")
            }
        } else {
            Navigate("/forbidden");
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Coupon Code", "startdate", "enddate", "Type", "value", "Discount", "Ordervalue", "Amount", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>

                                <th>Coupon Code</th>
                                <th>Coupon Type</th>
                                <th>Offer value</th>
                                <th>MaxDiscount</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr id={item.CouponCodeID}>

                                    <td>{item.CouponCode}</td>
                                    <td>{item.CouponType === 1 ? "Amount" : "Percentage"}</td>
                                    <td>{item.CouponType === 1 ? item.Amount : item.Percentage}</td>
                                    <td>{item.MaxDiscount}</td>
                                    <td>{moment(item.StartDate).format("Do MM YYYY")}</td>
                                    <td>{moment(item.EndDate).format("Do MM YYYY")}</td>
                                    <td>
                                        {item?.Status === 1 ? (
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
                                                id={item.CouponCodeID}
                                                onClick={editHandler}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                id={item.CouponCodeID}
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
                    <p>No Coupons Found</p>
                </div>
            )}
        </>
    );
}

export default Coupons;
