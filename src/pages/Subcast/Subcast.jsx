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

function Subcast() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Caste & Communities")[0];

    const getAllCategories = () => {
        Services.Subcast("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.SubCaste);
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
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate("/forbidden");
        }
    }, []);

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setEdit(true);
        let id = e.currentTarget.getAttribute("id");
        let subCaste = data.find(s => s.SubCasteID == id);
        Navigate(`/subcaste/Update?id=${id}`, { state: subCaste });
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        try {
            const res = await Services.DeleteSubcast("PUT", null, token, id)
            if (res.Status === 1) {
                SuccessSwal("Subcast Deleted", res.Message);
                getAllCategories(1);

            } else if (res.Status === 0) {
                warningSwal("Warning", res.Message);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);

        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Religion", "CreatedAt", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Religion</th>
                                <th>Caste</th>
                                <th>Sub Caste</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.SubCasteID}
                                >
                                    <td>{item.Religion}</td>
                                    <td>{item.Caste}</td>
                                    <td>{item.SubCaste}</td>
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
                                                id={item.SubCasteID}
                                                onClick={editHandler}>
                                                <FaRegEdit />
                                            </button>
                                            <button
                                                id={item.SubCasteID}
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
                    <p>No Sub castes Found</p>
                </div>
            )}
        </>
    );
}

export default Subcast;
