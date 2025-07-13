import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import { MdDelete } from "react-icons/md";

function Citys() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Personal Information")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const getAllCategories = () => {
        Services.getCitys("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.Cities);
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
    useEffect(() => {
        getAllCategories(1);
    }, []);

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        let state = data.find(s => s.CityID == id);
        console.log(state);
        Navigate(`/city/update?id=${id}`, { state: state });
    };
    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanDelete === 1) {
            try {
                const res = await Services.DeleteCity("PUT", null, token, id)
                if (res.Status === 1) {
                    SuccessSwal("City Deleted", res.Message);
                    getAllCategories(1);
                } else if (res.Status === 0) {
                    warningSwal("Warning", res.Message);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            Navigate("/forbidden")
        }
    };


    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["CityID", "State", "City", "Priority", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>State ID</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.CityID}>
                                    <td>{item.CityID}</td>
                                    <td>{item.State}</td>
                                    <td>{item.City}</td>
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
                                                id={item.CityID}
                                                onClick={editHandler}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                id={item.CityID}
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
                    <p>No States Found</p>
                </div>
            )}
        </>
    );
}

export default Citys;
