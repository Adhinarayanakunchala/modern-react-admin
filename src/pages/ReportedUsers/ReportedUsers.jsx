import Moment from "react-moment";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import Swal from "sweetalert2";

function ReportedUsers() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Reported Users")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories();
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const getAllCategories = () => {
        Services.ReportedUsers("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.Data);
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

    const BlockHandler = async (e, status) => {
        e.stopPropagation();
        e.preventDefault();
        if (filteredItems?.CanEdit === 1) {
            const actionText = status == 5 ? 'Block' : 'Unblock';
            const confirmButtonColor = status == 5 ? '#d33' : '#3085d6';

            let id = e.currentTarget.getAttribute("id");
            let body = { Status: status }
            Swal.fire({
                title: `Are you sure you want to ${actionText} this user?`,
                text: `This action will ${actionText.toLowerCase()} the user.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Yes, ${actionText}`,
                cancelButtonText: 'Cancel',
                confirmButtonColor: confirmButtonColor,
                cancelButtonColor: '#6c757d',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await Services.EditUser("PUT", JSON.stringify(body), token, id)
                        if (res.Status === 1) {
                            SuccessSwal("User Status Updated", res.Message);
                            getAllCategories(1);

                        } else if (res.Status === 0) {
                            warningSwal("Warning", res.Message);
                        }
                    } catch (err) {
                        console.log(err);
                        setLoading(false);
                    }
                }

            });
        } else {
            Navigate("/forbidden");
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["ReportBy_UserID", "ReportTo_UserID", "ReportBy_UserName", "ReportTo_UserName", "ReportBy_MobileNumber", "ReportTo_MobileNumber", "Comments"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Reporter_ID</th>
                                <th>UserName</th>
                                <th>MobileNumber</th>
                                <th>Reported_ID</th>
                                <th>UserName</th>
                                <th>MobileNumber</th>
                                <th>Comments</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ReportBy_UserID}</td>
                                    <td>{item.ReportBy_UserName}</td>
                                    <td>{item.ReportBy_MobileNumber}</td>
                                    <td>{item.ReportTo_UserID}</td>
                                    <td>{item.ReportTo_UserName}</td>
                                    <td>{item.ReportTo_MobileNumber}</td>
                                    <td><p className={CommonClasses["comments"]}>{item.Comments}</p></td>
                                    <td> {item.Date}</td>
                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Block-btns"]
                                            }>
                                            {
                                                item?.ReportTo_Status === 5 ?
                                                    <button
                                                        className={CommonClasses["unblock"]}
                                                        id={item.ReportTo_UserID}
                                                        onClick={(e) => BlockHandler(e, 1)}
                                                    >
                                                        UnBlock
                                                    </button>
                                                    :
                                                    <button
                                                        className={CommonClasses["block"]}
                                                        id={item.ReportTo_UserID}
                                                        onClick={(e) => BlockHandler(e, 5)}
                                                    >
                                                        Block
                                                    </button>
                                            }
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

export default ReportedUsers;
