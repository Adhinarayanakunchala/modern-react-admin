import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect, useRef, act } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Services } from "Services";
import { SuccessSwal, warningSwal } from "Util/Toast";
import SkeletonLoad from "Components/TableLoad/load";
import CommonClasses from "Styles/Common.module.css";
import moment from "moment";
import { MdDelete, MdOutlinePreview, MdSubscriptions } from "react-icons/md";
import ReactPaginate from "react-paginate";
import TabClasses from "../../Components/Tabs/Tabs.module.css";
import AddPlan from "./AddPlan/AddPlan";

function Users() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [size, setSize] = useState(50);
  const token = { Authorization: `token ${localStorage.getItem("token")}` };
  const [subscription, setSubscription] = useState(false);
  const [userId, setUserId] = useState(null);
  const [premiumId, setPremiumId] = useState(null);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "NOKYC";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchType, setSearchType] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeout = useRef(null);
  const [records, setRecords] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
  const filteredItems = AccessItems.filter(
    (item) => item.PageName === "Users"
  )[0];

  useEffect(() => {
    if (filteredItems?.CanRead === 1) {
      return;
    } else {
      Navigate("/forbidden");
    }
  }, []);

  useEffect(() => {
    searchParams.set("tab", activeTab);
    setSearchParams(searchParams);
    setLoading(true);
    setSearchQuery("");
  }, [activeTab, searchParams, setSearchParams]);

  const TabsData = [
    { label: "No KYC", type: "NOKYC" },
    { label: "Active-Users", type: "ACTIVEUSERS" },
    { label: "Inactive Users", type: "INACTIVEUSERS" },
    { label: "Premium Users", type: "PREMIUMUSERS" },
    { label: "Created by Admin", type: "CREATEDBYADMIN" },
    { label: "Pending Verification", type: "PENDINGVERIFICATION" },
    { label: "Blocked Users", type: "BLOCKEDUSERS" },
  ];

  const getAllCategories = (type, page, count) => {
    Services.TabsFilter("GET", null, token, type, page, count)
      .then((response) => {
        // console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 200);
        if (response.Status === 1) {
          setData(response.Users);
          setRecords(response.StatusCounts);
          setPagination(response?.Pagination);
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
    getAllCategories(activeTab, pageCount, size);
  }, [activeTab]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setPageCount(newPage);
    setPagination((prevState) => ({ ...prevState, page: newPage }));
    getAllCategories(activeTab, newPage, size, searchQuery, searchType);

    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const editHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let id = e.currentTarget.getAttribute("id");
    if (filteredItems?.CanEdit === 1) {
      Navigate(`/users/Update?id=${id}`);
    } else {
      Navigate("/forbidden");
    }
  };

  const user = (e) => {
    let id = e.currentTarget.getAttribute("id");
    Navigate(`/users/Details`, { state: id });
  };

  const deleteHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (filteredItems?.CanDelete === 1) {
      let body = {
        UserID: e.currentTarget.getAttribute("id"),
      };
      try {
        const res = await Services.DeleteUser(
          "DELETE",
          JSON.stringify(body),
          token
        );

        if (res.Status === 1) {
          SuccessSwal("User Deleted", res.Message);
          getAllCategories(activeTab, pageCount, size);
        } else if (res.Status === 0) {
          warningSwal("Warning", res.Message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Navigate("/forbidden");
    }
  };

  const searchHandler = async (query, type, page, size) => {
    let body = {};
    if (type === "id") {
      body.UserID = query;
    } else if (type === "name") {
      body.UserName = query;
    } else if (type === "number") {
      body.MobileNumber = query;
    }

    try {
      setLoading(true);
      const response = await Services.UsersSearch(
        "POST",
        JSON.stringify(body),
        token,
        activeTab,
        page,
        size
      );
      setLoading(false);
      if (response.Status === 1) {
        setData(response?.Users);
        setPagination(response?.Pagination);
      } else if (response.Status === 0) {
        warningSwal("Warning", response.Message);
        setTimeout(() => {
          getAllCategories(1, activeTab);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // if (searchType === 'id' && !/^[0-9]{1,10}$/.test(query)) {
    //     return;
    // }
    // if (searchType === 'name' && !/^[a-zA-Z\s]+$/.test(query)) {
    //     return;
    // }
    // if (searchType === 'number' && !/^[6-9][0-9]{9}$/.test(query)) {
    //     return;
    // }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if (query) {
        searchHandler(query, searchType, pageCount, size);
      } else {
        getAllCategories(activeTab, pageCount, size);
      }
    }, 1000);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchQuery("");
    getAllCategories(activeTab, pageCount, size);
  };

  const Subscription = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let id = e.currentTarget.getAttribute("id");
    let premium = e.currentTarget.getAttribute("premium");
    setSubscription(true);
    setUserId(id);
    setPremiumId(premium);
  };

  const Records = ({ statusType }) => {
    const record = records.find((record) => record.Status === statusType);
    return <span>{record ? record.Count : 0}</span>;
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allUserIds = data?.map((user) => user?.UserID).filter(Boolean);
      setSelectedUserIds(allUserIds);
      console.log(allUserIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const AcctivateTheUsers = async () => {
    let body = {};
    if (activeTab === "NOKYC") {
      body = {
        UserIDs: selectedUserIds,
        Type: "NOKYC",
      };
    } else {
      body = {
        UserIDs: selectedUserIds,
      };
    }
    try {
      const res = await Services.ActiveAllUsers(
        "PUT",
        JSON.stringify(body),
        token
      );
      if (res?.Status === 1) {
        setSelectedUserIds([]);
        getAllCategories(activeTab, pageCount, size);
        SuccessSwal("Success", res.Message);
      } else if (res?.Status === 0) {
        warningSwal("warning", res?.Message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={CommonClasses.main_cont}>
      <div className={CommonClasses.Btns}>
        <div className={TabClasses["Navigator"]}>
          {TabsData.map((tab) => (
            <button
              key={tab.type}
              type="button"
              className={activeTab === tab.type ? TabClasses["active"] : ""}
              onClick={() => {
                setActiveTab(tab.type);
              }}
            >
              {tab?.label} <Records statusType={tab.type} />
            </button>
          ))}
        </div>
      </div>
      <div className={CommonClasses["combinedWrapper"]}>
        <div className={CommonClasses.serchFileter}>
          <select onChange={handleSearchTypeChange} value={searchType}>
            <option value="id">User ID</option>
            <option value="name">User Name</option>
            <option value="number">Mobile Number</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder={`Search by ${searchType.replace("id", "User ID").replace("name", "User Name").replace("number", "Mobile Number")}`}
          />
        </div>
        {(activeTab === "PENDINGVERIFICATION" || activeTab === "NOKYC") &&
          data?.length > 0 && (
            <div className={CommonClasses["selectAll"]}>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUserIds?.length === data?.length}
              />
              <button
                type="button"
                disabled={selectedUserIds?.length === 0}
                onClick={AcctivateTheUsers}
              >
                Active All Users
              </button>
            </div>
          )}
      </div>
      {loading ? (
        <SkeletonLoad
          TableHead={[
            "UserName",
            "MobileNumber",
            "DOB",
            "Age",
            "Gender",
            "MaritalStatus",
            "Caste",
            "Religion",
            "Gothram",
          ]}
        />
      ) : data.length > 0 ? (
        <div className={CommonClasses["Table"]}>
          <table>
            <thead>
              <tr>
                <th>Profile ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>DOB</th>
                <th>Age</th>
                <th>Gender</th>
                <th>MaritalStatus</th>
                <th>Caste</th>
                <th>Religion</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr id={item.UserID}>
                    <td>{item.UserID}</td>
                    <td>{item.UserName}</td>
                    <td>{item.MobileNumber}</td>
                    <td>
                      {item?.DOB ? moment(item?.DOB).format("DD-MM-YYYY") : ""}
                    </td>
                    <td>{item.Age}</td>
                    <td>
                      {item.Gender == 1 ? (
                        <div className={CommonClasses["status-male"]}>
                          <span>Female</span>
                        </div>
                      ) : item.Gender == 2 ? (
                        <div className={CommonClasses["status-female"]}>
                          <span>Male</span>
                        </div>
                      ) : (
                        <div className={CommonClasses["status-others"]}>
                          <span>Others</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {item.MaritalStatus === 1 ? (
                        <div className={CommonClasses["status-male"]}>
                          <span>Never Married</span>
                        </div>
                      ) : item.MaritalStatus === 2 ? (
                        <div className={CommonClasses["status-others"]}>
                          <span>Divorced</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{item?.Caste}</td>
                    <td>{item?.Religion}</td>
                    <td>
                      <div className={CommonClasses["pre-remover"]}>
                        {item?.IsPremium === 1 ? (
                          <div className={CommonClasses["status-pre"]}>
                            <span>PREMIUM</span>
                          </div>
                        ) : (
                          <div className={CommonClasses["status-No"]}>
                            <span>FREE</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{moment(item.CreatedAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <div className={CommonClasses["Action-btns"]}>
                        <button
                          id={item.UserID}
                          premium={item.IsPremium}
                          onClick={Subscription}
                        >
                          <MdSubscriptions />
                        </button>
                        <button id={item.UserID} onClick={user}>
                          <MdOutlinePreview />
                        </button>
                        <button id={item.UserID} onClick={editHandler}>
                          <FaRegEdit />
                        </button>

                        <button id={item.UserID} onClick={deleteHandler}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            nextLabel=" >>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pagination?.totalPages}
            forcePage={pageCount - 1}
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
          <p>No Users Found</p>
        </div>
      )}

      {subscription && (
        <AddPlan
          isopen={subscription}
          onClose={() => setSubscription(false)}
          userId={userId}
          premium={premiumId}
          getUsers={getAllCategories}
          page={pageCount}
          size={size}
          type={activeTab}
        />
      )}
    </div>
  );
}

export default Users;
