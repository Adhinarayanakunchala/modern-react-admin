import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import TabClasses from '../../Components/Tabs/Tabs.module.css';
import { MdDelete } from "react-icons/md";


function Banners() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const [activeTab, setActiveTab] = useState("HOME");

    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Banners")[0];

    const TabsData = [
        { label: 'Home', type: 'HOME' },
        { label: 'Explore', type: 'EXPLORE' },
        { label: 'Premium ', type: 'PREMIUM' },
        { label: 'Near you', type: 'NEARYOU' },
        {
            label: 'Preference', type: 'PREFERENCE'
        },
        { label: 'Profile', type: 'PROFILE' }

    ];


    const getAllCategories = (type) => {
        Services.Banners("GET", null, token, type)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.Banners);

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
        if (filteredItems?.CanRead === 1) {
            getAllCategories(activeTab);
        } else {
            Navigate("/forbidden")
        }
    }, [activeTab]);

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanEdit === 1) {
            Navigate(`/banners/Update?id=${id}`);
        } else {
            warningSwal("Unauthorized !", " Please contact the admin.");
        }
    };

    const deleteHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (filteredItems?.CanDelete === 1) {
            let id = e.currentTarget.getAttribute("id");
            Services.DeleteBanner("POST", JSON.stringify({ BannerID: id }), token)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                    if (response.Status === 1) {
                        SuccessSwal("Banner Deleted successfully", response.Message);
                        getAllCategories(activeTab);
                    } else if (response.Status === 0) {
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    alert("something went wrong please try again");
                    console.log(err);
                });
        } else {
            warningSwal("Unauthorized !", " Please contact the admin.");
        }
    };

    return (
        <>
            <div className={CommonClasses.Btns}>
                <div className={TabClasses["Navigator"]}>
                    {
                        TabsData.map((tab, index) => (
                            <button
                                key={tab.type}
                                type="button"
                                className={activeTab === tab.type ? TabClasses["active"] : ""}
                                onClick={() => setActiveTab(tab.type)}
                            >
                                {tab.label}
                            </button>
                        ))}
                </div>
            </div>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Image", "Category", "Priority", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) => (
                                    <tr
                                        id={item.BannerID}>
                                        <td >
                                            <img src={item.BannerImage}
                                                onClick={() => window.open(item.BannerImage, "Banner")}
                                                style={{ width: "10rem" }}
                                            />
                                        </td>
                                        <td>{item.BannerCategory}</td>
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
                                                    id={item.BannerID}
                                                    onClick={editHandler}>
                                                    <FaRegEdit />
                                                </button>

                                                <button
                                                    id={item.BannerID}
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
                    <p>No Banners Found</p>
                </div>)
            }
        </>
    );
}

export default Banners;
