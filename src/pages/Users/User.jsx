import Layout from "Components/Layout";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MainLoader from "../../Components/loader/loader";
import TutorClasses from "../Users/AddUser/index.module.css";
import { Helmet } from "react-helmet";
import { Success, SuccessSwal, warningSwal } from "Util/Toast";
import { Services } from "Services";
import Tabs from "Components/Tabs/Tabs";
import moment from "moment";
import Logo from "../../Assets/noplot.png";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const User = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  const Id = location.state;
  const [loading, setLoading] = useState(false);
  const [mainLoad, setMainLoad] = useState(false);
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Bio");
  const [familyDetails, setFamilyDetails] = useState({});
  const [career, setCareer] = useState({});
  const [preferences, setPreferences] = useState({});
  const [documents, setDocuments] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const token = { Authorization: `token ${localStorage.getItem("token")}` };
  const [premiumDetails, setPremiumDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
  const filteredItems = AccessItems.filter(
    (item) => item.PageName === "Users"
  )[0];

  const TabsData = [
    "Bio",
    "Personal Details",
    "Premium Details",
    "Contact Deatils",
    "Family Details",
    "Career & Education",
    "Caste & Community",
    "Astro",
    "Partner Preference",
    "User Documents",
    "User Images",
  ];
  // JSON

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getUser = async () => {
    try {
      const response = await Services.UserById(
        "POST",
        JSON.stringify({ UserID: Id }),
        token
      );
      setTimeout(() => {
        setLoading(false);
      }, 200);
      if (response.Status === 1) {
        setData(response.User);
        setFamilyDetails(response.FamilyDetails);
        setCareer(response.Career);
        setPreferences(response.Preferences);
        setDocuments(response.Documents);
        setPremiumDetails(response.UserPlans);

        setTimeout(() => {
          setMainLoad(false);
        }, 200);
      } else if (response.Status === 0) {
        warningSwal("Warning", response.Message);
      }
    } catch (err) {
      // alert(err);
      alert("something went wrong please try again");
      console.log(err);
    }
  };

  const getHobbies = async () => {
    try {
      const res = await Services.Hobbies("GET", null, token);
      if (res.Status === 1) {
        setHobbies(res.HobbiesCategories);
      } else if (res.Status === 0) {
        warningSwal("Error", res.Message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getHobbies();
    getUser();
  }, []);

  useEffect(() => {
    Creadits(size, page);
  }, [size, page]);

  const Creadits = async (count, paze) => {
    try {
      const res = await Services.UserCredits(
        "GET",
        null,
        token,
        Id,
        count,
        paze
      );
      if (res?.Status === 1) {
        setCredits(res?.UsedCredits);
        setPagination(res?.Pagination);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const backButton = () => {
    Navigate(-1);
  };

  const UpdateDocument = async (dId, docStatus, type) => {
    let body = {
      DocumentStatus: docStatus,
      DocumentType: type,
      UserID: Id,
    };
    if (filteredItems?.CanEdit === 1) {
      try {
        const res = await Services.DocumentStatuses(
          "PUT",
          JSON.stringify(body),
          token,
          dId
        );
        if (res.Status === 1) {
          getUser();
          Success(res.Message);
        } else if (res.Status === 0) {
          warningSwal("warning", res.Message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Navigate("/forbidden");
    }
  };

  const ApproveDocuments = async (docStatus) => {
    let body = {
      DocumentStatus: docStatus,
    };
    if (filteredItems?.CanEdit === 1) {
      try {
        const res = await Services.DocumentsApprove(
          "PUT",
          JSON.stringify(body),
          token,
          Id
        );
        if (res.Status === 1) {
          getUser();
          Success(res.Message);
        } else if (res.Status === 0) {
          warningSwal("warning", res.Message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Navigate("/forbidden");
    }
  };

  const converter1 = (body) => {
    if (body >= 10000000 && body !== null) {
      return body / 10 ** 7 + "crore";
    } else if (body >= 50000) {
      return body / 10 ** 5 + "lakh";
    } else {
      return "0";
    }
  };
  const converter2 = (body) => {
    if ((body === 0 && body != null) || (body >= 10000000 && body != null)) {
      return "1 crore above";
    } else if (body >= 50000) {
      return body / 10 ** 5 + "lakh";
    } else {
      return "0";
    }
  };

  // const converter = (fromValue, toValue) => {
  //     if (toValue <= 0) {
  //         if (fromValue < 10000000) {
  //             return "1 crore above";
  //         } else {
  //             return fromValue / 10 ** 7 + " crore";
  //         }
  //     } else if (toValue > 10000000) {
  //         if (fromValue < 10000000) {
  //             return "1 crore above";
  //         } else {
  //             return toValue / 10 ** 7 + " crore";
  //         }
  //     } else if (toValue >= 100000 && fromValue >= 100000) {
  //         return toValue / 10 ** 5 + " lakh";
  //     } else {
  //         return "NA";
  //     }
  // };

  const formatHeight = (Height_ft, Height_In) => {
    return `${Height_ft || 0}ft ${Height_In || 0}in`;
  };

  const StatusHandler = async () => {
    const actionText = data.Status === 0 ? "Active" : "";
    const confirmButtonColor = data?.Status === 0 ? "#3085d6" : "";

    let body = { Status: 1 };
    Swal.fire({
      title: `Are you sure you want to ${actionText} this user?`,
      text: `This action will ${actionText.toLowerCase()} the user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await Services.EditUser(
            "PUT",
            JSON.stringify(body),
            token,
            Id
          );
          if (res.Status === 1) {
            SuccessSwal("User Status Updated", res.Message);
            getUser();
          } else if (res.Status === 0) {
            warningSwal("Warning", res.Message);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    });
  };
  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setPage(newPage);
    setPagination((prevState) => ({ ...prevState, page: newPage }));
    Creadits(size, newPage);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <Layout Active={"Users"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>user Details</title>
      </Helmet>
      {mainLoad && <MainLoader />}
      <div className={TutorClasses["Container"]}>
        <button onClick={backButton} className={TutorClasses["back"]}>
          Back
        </button>
        <div className={TutorClasses["wrapper"]}>
          <div className={TutorClasses["head_tickle"]}>
            <h3>User Details</h3>
            {data?.Status === 0 && (
              <button type="button" onClick={StatusHandler}>
                Active User
              </button>
            )}
          </div>
          <div className={TutorClasses.Btns}>
            <Tabs
              TabsData={TabsData}
              ActiveTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className={TutorClasses.tabscontent}>
            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Bio" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        BIO
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Bio</th>
                        <td>
                          <p className={TutorClasses.textBio}>
                            {data?.Bio || "NA"}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Personal Details" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Personal Details
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>User Name</th>
                        <td>{data?.UserName}</td>
                      </tr>
                      <tr>
                        <th>Sur Name</th>
                        <td>{data?.Surname}</td>
                      </tr>
                      <tr>
                        <th>Date of Birth</th>
                        <td>
                          {data.DOB
                            ? moment(data.DOB).format("Do MMMM YYYY")
                            : "NA"}
                        </td>
                      </tr>

                      <tr>
                        <th>Age</th>
                        <td>{data?.Age ? `${data?.Age} Years` : "  NA"}</td>
                      </tr>
                      <tr>
                        <th>Gender</th>
                        <td>
                          {data?.Gender == 1
                            ? "Female"
                            : data?.Gender == 2
                              ? "Male"
                              : null}
                        </td>
                      </tr>
                      <tr>
                        <th>MotherTongue</th>
                        <td>{data?.MotherTongue || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Marital Status</th>
                        <td>
                          {data?.MaritalStatus === 1
                            ? "Never Married"
                            : "Divorced" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <th>Height</th>
                        <td>
                          {formatHeight(data?.Height_ft, data?.Height_In) ||
                            "NA"}
                        </td>
                      </tr>
                      <tr>
                        <th>weight</th>
                        <td>{data?.Weight ? `${data?.Weight} kg` : "NA"}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{data?.MobileNumber || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Languages known</th>
                        <td>
                          <p className={TutorClasses.overlap}>
                            {(data?.LanguagesKnown).replace(" [ ", " ").replace(
                              " ] ",
                              " "
                            ) || "NA"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th>Hobbies</th>
                        {/* ex data: [1,2,3,4,5] <td>{data?.Hobbies ? hobbies.filter((e) => JSON.parse(data?.Hobbies)?.includes(e.HobbieID)).map((e) => e.Hobbie).join(", ") : ""}</td> */}
                        <td>
                          <p className={TutorClasses.overlap}>
                            {data?.Hobbies?.join(" , ") || "NA"}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Premium Details" && (
                <div className={TutorClasses["combind_container"]}>
                  <div className={TutorClasses["Tabledata"]}>
                    <table className={TutorClasses["StyledTable"]}>
                      <thead>
                        <th colSpan={2} className={TutorClasses.header}>
                          Premium Details
                        </th>
                      </thead>

                      <tbody>
                        {Object.keys(premiumDetails).length > 0 ? (
                          <>
                            <tr>
                              <th>Plan Name with price</th>
                              <td>
                                {premiumDetails?.PlanName
                                  ? premiumDetails?.PlanName
                                  : "NA"}
                                {"-"}
                                {premiumDetails?.PlanCost
                                  ? premiumDetails?.PlanCost
                                  : "NA"}
                              </td>
                            </tr>
                            <tr>
                              <th> Validity from</th>
                              <td>
                                {premiumDetails?.SubscriptionStartDate
                                  ? premiumDetails?.SubscriptionStartDate
                                  : "NA"}
                              </td>
                            </tr>
                            <tr>
                              <th> Validity To</th>
                              <td>
                                {premiumDetails?.SubscriptionEndDate
                                  ? premiumDetails?.SubscriptionEndDate
                                  : "NA"}
                              </td>
                            </tr>
                            <tr>
                              <th> Used credits</th>
                              <td>
                                {premiumDetails?.UsedCredits
                                  ? premiumDetails?.UsedCredits
                                  : "NA"}
                              </td>
                            </tr>
                            <tr>
                              <th> Total credits</th>
                              <td>
                                {premiumDetails?.Credits
                                  ? premiumDetails?.Credits
                                  : "NA"}
                              </td>
                            </tr>
                          </>
                        ) : (
                          <tr>
                            <td>There is No Premium plans</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className={TutorClasses["credits_wrapper"]}>
                    <h2>Credits History</h2>
                    <table className={TutorClasses["StyledTable"]}>
                      <thead>
                        <tr>
                          <th className={TutorClasses.header}>From UserName</th>
                          <th className={TutorClasses.header}>To UserName</th>
                          <th className={TutorClasses.header}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {credits?.length > 0 ? (
                          credits?.map((credit, i) => {
                            return (
                              <tr key={i}>
                                <td>{credit?.FromUserName}</td>
                                <td>{credit?.ToUserName}</td>
                                <td>
                                  {moment(credit?.CreatedAt).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={3}>No History Here!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className={"Paginate_wrapper"}>
                      <div>
                        Showing rows {(page - 1) * size + 1} to{" "}
                        {Math.min(page * size, pagination?.TotalCreditsCount)}{" "}
                        of {pagination?.TotalCreditsCount}
                      </div>
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pagination.totalPages}
                        previousLabel="<"
                        forcePage={page - 1}
                        renderOnZeroPageCount={null}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Contact Deatils" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Contact Details
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>EmailID</th>
                        <td>{data?.EmailID || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Contact Number</th>
                        <td>{data?.SecondaryMobileNumber || "NA"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Family Details" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Family Details
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Father Name</th>
                        <td>{familyDetails?.FatherName || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Father Employment</th>
                        <td>{familyDetails?.FatherEmployment || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Mother Name</th>
                        <td>{familyDetails?.MotherName || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Mother Employment</th>
                        <td>{familyDetails?.MotherEmployment || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Family Type</th>
                        <td>{familyDetails?.FamilyValues || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Family Affluence</th>
                        <td>{familyDetails?.FamilyAffluence || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Net Worth</th>
                        <td>
                          {"Rs "}
                          {converter1(familyDetails?.FromIncome)}-
                          {converter2(familyDetails?.ToIncome)}
                        </td>
                      </tr>
                      <tr>
                        <th>Sibling Details</th>
                        <td>{familyDetails?.SiblingDetails}</td>
                      </tr>
                      <tr>
                        <th>Brothers</th>
                        <td>
                          {familyDetails?.Brothers
                            ? `${familyDetails?.Brothers} Brothers`
                            : "NA"}
                        </td>
                      </tr>
                      <tr>
                        <th>Sisters</th>
                        <td>
                          {familyDetails?.Sisters
                            ? `${familyDetails?.Sisters} Sisters`
                            : "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Career & Education" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Career & Education
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Job Status</th>
                        <td>{career?.JobStatus}</td>
                      </tr>
                      {career?.JobStatus == "Working" && (
                        <>
                          <tr>
                            <th>Company Name</th>
                            <td>{career?.Company}</td>
                          </tr>
                          <tr>
                            <th>Profession</th>
                            <td>{career?.Profession}</td>
                          </tr>
                          <tr>
                            <th>Annual Income </th>
                            <td>
                              {"Rs "}
                              {converter1(career?.FromIncome)}-
                              {converter2(career?.ToIncome)}
                            </td>
                          </tr>
                          <tr>
                            <th>Job location</th>
                            <td>{career?.JobLocation}</td>
                          </tr>
                        </>
                      )}
                      <tr>
                        <th>High Qualification</th>
                        <td>{career?.HighestQualification}</td>
                      </tr>
                      <tr>
                        <th>college</th>
                        <td>{career?.College}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Caste & Community" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Caste & Community
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Religion </th>
                        <td>{data?.Religion || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Caste</th>
                        <td>{data?.Caste || "NA"}</td>
                      </tr>
                      <tr>
                        <th>Sub Caste</th>
                        <td>{data?.SubCaste || "NA"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Partner Preference" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Partner Preference
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Age</th>
                        <td>{`${preferences?.Preferred_FromAge || 0} - ${preferences?.Preferred_ToAge || 0}`}</td>
                      </tr>
                      <tr>
                        <th>Height</th>
                        <td>{`${formatHeight(preferences?.Preferred_FromHeight_ft, preferences?.Preferred_FromHeight_In)} - ${formatHeight(preferences?.Preferred_ToHeight_ft, preferences?.Preferred_ToHeight_In)}`}</td>
                      </tr>
                      <tr>
                        <th>Weight </th>
                        <td>{`${preferences?.Preferred_FromWeight || 0} kg - ${preferences?.Preferred_ToWeight || 0} kg`}</td>
                      </tr>
                      <tr>
                        <th>withProfile picture </th>
                        <td>
                          {preferences?.WithProfilePicture === 1 ? "Yes" : "No"}
                        </td>
                      </tr>
                      <tr>
                        <th>Physical Status </th>
                        <td>{preferences?.Preferred_PhysicalStatus}</td>
                      </tr>
                      <tr>
                        <th>Marital Status </th>
                        <td>
                          {preferences?.Preferred_MaritalStatus == 1
                            ? "Never Married"
                            : preferences?.Preferred_MaritalStatus == 2
                              ? "Divorced"
                              : "NA"}
                        </td>
                      </tr>
                      <tr>
                        <th>Mother Tongue </th>
                        <td>
                          {preferences?.Preferred_MotherTongue
                            ? preferences?.Preferred_MotherTongue
                            : "NA"}
                        </td>
                      </tr>
                      <tr>
                        <th>Profession</th>
                        <td>
                          {preferences?.Preferred_Profession
                            ? preferences?.Preferred_Profession
                            : "NA"}
                        </td>
                      </tr>

                      <tr>
                        <th>Income</th>
                        <td>
                          {"Rs "}
                          {converter1(preferences?.FromIncome)}-{" "}
                          {converter2(preferences?.ToIncome)}
                        </td>
                      </tr>
                      <tr>
                        <th>Community</th>
                        <td>
                          {preferences?.Preferred_Caste_List &&
                          preferences.Preferred_Caste_List.length > 0
                            ? preferences.Preferred_Caste_List.map(
                                (e) => e.Caste
                              ).join(", ")
                            : "NA"}
                        </td>
                      </tr>
                      <tr>
                        <th>Caste</th>
                        <td>
                          {preferences?.Preferred_SubCaste_List &&
                          preferences.Preferred_SubCaste_List.length > 0
                            ? preferences.Preferred_SubCaste_List.map(
                                (e) => e.SubCaste
                              ).join(", ")
                            : "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "Astro" && (
                <div className={TutorClasses["Tabledata"]}>
                  <table className={TutorClasses["StyledTable"]}>
                    <thead>
                      <th colSpan={2} className={TutorClasses.header}>
                        Astro
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Rasi</th>
                        <td>{data?.Rasi ? data?.Rasi : "NA"}</td>
                      </tr>
                      <tr>
                        <th>Gothram</th>
                        <td>{data?.Gothram ? data?.Gothram : "NA"}</td>
                      </tr>
                      <tr>
                        <th>Star </th>
                        <td>{data?.Star ? data?.Star : "NA"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "User Images" && (
                <div className="ImageContainer">
                  {data?.UserImages.length > 0 ? (
                    data?.UserImages.map((item, index) => {
                      return (
                        <div className="image_flow">
                          <div className="image_co" key={index}>
                            <img
                              className="user_img"
                              src={item !== "NA" ? item : Logo}
                              onClick={() => window.open(item, "UserImages")}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = Logo;
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="nodata_text">No User Images here</p>
                  )}
                </div>
              )
            )}

            {mainLoad ? (
              <MainLoader />
            ) : (
              activeTab === "User Documents" && (
                <div className={TutorClasses["Tabledata"]}>
                  <h2 className={TutorClasses["documents-header"]}>
                    KYC Details{" "}
                    {data?.Status === 1 ? (
                      <p className={TutorClasses["Approve"]}>Approved</p>
                    ) : data?.Status === 2 ? (
                      <p className={TutorClasses["Pending"]}>pending</p>
                    ) : data?.Status === 3 ? (
                      <p className={TutorClasses["Rejected"]}>Rejected</p>
                    ) : (
                      ""
                    )}
                  </h2>
                  <table className={TutorClasses["StyleTable"]}>
                    <thead className={TutorClasses["dochead"]}>
                      <tr>
                        <th>Document Type</th>
                        <th>KYC_Type</th>
                        <th>Document Back</th>
                        <th>Document Front</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.length > 0 ? (
                        documents.map((doc) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <h3>{doc?.DocumentType}</h3>
                                </td>
                                <td>
                                  <h3>
                                    {doc?.KYC_Type != "NA"
                                      ? doc?.KYC_Type
                                      : "Pay slips"}
                                  </h3>
                                </td>
                                <td>
                                  <img
                                    style={{
                                      display: "flex",
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover",
                                      cursor: "pointer",
                                    }}
                                    src={
                                      doc?.Document?.BACK != "NA"
                                        ? doc?.Document?.BACK
                                        : Logo
                                    }
                                    onClick={() =>
                                      window.open(
                                        doc?.Document?.BACK,
                                        "Documents"
                                      )
                                    }
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = Logo;
                                    }}
                                    alt="Document"
                                  />
                                </td>
                                <td>
                                  <img
                                    style={{
                                      display: "flex",
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover",
                                      cursor: "pointer",
                                    }}
                                    src={
                                      doc?.Document?.FRONT != "NA"
                                        ? doc?.Document?.FRONT
                                        : Logo
                                    }
                                    onClick={() =>
                                      window.open(
                                        doc?.Document?.FRONT,
                                        "Banner"
                                      )
                                    }
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = Logo;
                                    }}
                                    alt="Document"
                                  />
                                </td>

                                <td>
                                  <div className={TutorClasses["Action-btns"]}>
                                    {doc?.Document?.BACK?.endsWith("/NA") ||
                                    doc?.Document?.FRONT?.endsWith("/NA") ? (
                                      ""
                                    ) : doc?.DocumentStatus === 1 ? (
                                      "Approved"
                                    ) : doc.DocumentStatus === 2 ? (
                                      <>
                                        <button
                                          type="button"
                                          className={
                                            TutorClasses["Action-abtn"]
                                          }
                                          onClick={() =>
                                            UpdateDocument(
                                              doc.DocumentID,
                                              1,
                                              doc.DocumentType
                                            )
                                          }
                                        >
                                          Approve
                                        </button>
                                        <button
                                          type="button"
                                          className={
                                            TutorClasses["Action-rbtn"]
                                          }
                                          onClick={() =>
                                            UpdateDocument(
                                              doc.DocumentID,
                                              3,
                                              doc.DocumentType
                                            )
                                          }
                                        >
                                          Reject
                                        </button>{" "}
                                      </>
                                    ) : doc?.DocumentStatus === 3 ? (
                                      "Rejected"
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center" }}>
                            No Douments Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {data?.Status === 2 &&
                    !documents.every(
                      (doc) =>
                        doc.DocumentStatus === 0 ||
                        doc?.Document?.BACK?.endsWith("/NA") ||
                        doc?.Document?.FRONT?.endsWith("/NA")
                    ) && (
                      <div className={TutorClasses["kyc_btn"]}>
                        <button
                          type="button"
                          onClick={() => ApproveDocuments(1)}
                          className={TutorClasses["Action-abtn"]}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => ApproveDocuments(3)}
                          className={TutorClasses["Action-rbtn"]}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
