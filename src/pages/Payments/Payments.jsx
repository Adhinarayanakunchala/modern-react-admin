import Moment from "react-moment";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "Services";
import { warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "../../Styles/Common.module.css"
import ReactPaginate from "react-paginate";


function Payments() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const itemsPerPage = 10;
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Payments")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1) {
            getAllCategories(1);
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const getAllCategories = (page) => {
        Services.Payments("GET", null, token)
            .then((response) => {
                // console.log(response);
                setTimeout(() => {
                    setLoading(false);
                }, 200);
                if (response.Status === 1) {
                    setItemOffset(0);
                    setCurrentPage(0);
                    setData(response.PaymentDetails);
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
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
        console.log('event', event);
    };

    return (
        <>
            {loading ? (
                <SkeletonLoad
                    TableHead={["UserID", "Name", "Number", "PlanName", "PlanCost", "Amount", "RazorpayOrderId"]}
                />
            ) : data.length > 0 ? (
                <div className={CommonClasses["Table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>User Name</th>
                                <th>Mobile Number</th>
                                <th>PlanName</th>
                                <th>PlanCost</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>RazorpayOrderId</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr
                                    id={item.UserID}
                                >
                                    <td>{item.UserID}</td>
                                    <td>{item.UserName}</td>
                                    <td>{item.MobileNumber}</td>
                                    <td>{item.PlanName}</td>
                                    <td>₹{item.PlanCost}</td>
                                    <td>₹{item.Amount}</td>
                                    <td>
                                        {item.PaymentStatus === 1 ? (
                                            <div
                                                className={
                                                    CommonClasses[
                                                    "Status-active"
                                                    ]
                                                }>
                                                <span>Success</span>
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    CommonClasses[
                                                    "Status-inactive"
                                                    ]
                                                }>
                                                <span>Failed</span>
                                            </div>

                                        )}
                                    </td>
                                    <td>{item.RazorpayOrderId}</td>
                                    <td>{item.Date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        nextLabel=" >>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        forcePage={currentPage}
                        previousLabel="<<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item previous"
                        previousLinkClassName="page-link"
                        nextClassName="page-item next"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item break"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        disabledClassName="disabled"
                        renderOnZeroPageCount={null}
                    />
                </div>
            ) : (
                <div>
                    {" "}
                    <p>No Payments  Found</p>
                </div>
            )}
        </>
    );
}
export default Payments;
