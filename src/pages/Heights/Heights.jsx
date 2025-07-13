import { FaEdit, FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import { MdDelete } from "react-icons/md";

function Heights() {
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
        Services.Heights("GET", null, token)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setData(response.Heights);
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

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        let Height = data.find(h => h.HeightID == id)
        Navigate(`/height/Update?id=${id}`, { state: Height });
    };

    const deleteHandler = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let id = e.currentTarget.getAttribute("id");
        if (filteredItems?.CanDelete === 1) {
            try {
                const res = await Services.DeleteHeight("PUT", null, token, id)
                if (res.Status === 1) {
                    SuccessSwal("height Deleted", res.Message);
                    getAllCategories(1);

                } else if (res.Status === 0) {
                    warningSwal("Warning", res.Message);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);

            }
        } else {
            Navigate('/forbidden')
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["Height_ft", "Height_In", "Height_Cm", "Status", "Actions"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Height_ft</th>
                                <th>Height_In</th>
                                <th>Height_Cm</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    id={item.HeightID}
                                >
                                    <td>{item.Height_ft}</td>
                                    <td>{item.Height_In}</td>
                                    <td>{item.Height_Cm}</td>
                                    <td>
                                        <div
                                            className={
                                                CommonClasses["Action-btns"]
                                            }>
                                            <button
                                                id={item.HeightID}
                                                onClick={editHandler}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                id={item.HeightID}
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
                    <p>No Heights Found</p>
                </div>
            )}
        </>
    );
}

export default Heights;
