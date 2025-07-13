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

function Hobbies() {
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
        Services.Hobbies("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.HobbiesCategories);
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
        Navigate(`/hobbies/Update?id=${id}`);
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        try {
            const res = await Services.DeleteHobbie("DELETE", null, token, id)
            if (res.Status === 1) {
                SuccessSwal("Hobby Deleted", res.Message);
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
                    TableHead={["Name", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.HobbieID}
                                >
                                    <td>{item.Hobbie}</td>

                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Action-btns"]
                                            }>
                                            <button
                                                id={item.HobbieID}
                                                onClick={editHandler}>
                                                <FaRegEdit />
                                            </button>
                                            {/* <button
                                                id={item.HobbieID}
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
                    <p>No Hobbies  Found</p>
                </div>
            )}
        </>
    );
}
export default Hobbies;
