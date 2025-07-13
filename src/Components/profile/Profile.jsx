import React from "react";
import profileClasses from "./profle.module.css";
import { GrMail } from "react-icons/gr";
import { FaPhone } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import Moment from "react-moment";
import moment from "moment";
import user from "../../Assets/square-user.jpg";
function Profile({ data, update, id }) {
    function calculateAge(birthDateString) {
        const birthDate = moment(birthDateString);
        const currentDate = moment();

        const years = currentDate.diff(birthDate, "years");
        birthDate.add(years, "years"); // Adjust to the birth year
        const months = currentDate.diff(birthDate, "months");

        return `${years} years  ${months > 0 ? `${months}months` : ""}`;
    }
    return (
        <div className={profileClasses["wrapper"]}>
            <div className={profileClasses["profile"]}>
                <div className={profileClasses["Contact"]}>
                    <div>
                        <div
                            style={{
                                border: "1px solid #ddd",
                                padding: "0.2rem",
                                width: "fit-content",
                            }}>
                            <header className={profileClasses["initials"]}>
                                <img
                                    src={data?.ProfilePicture}
                                    alt={"profile"}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = user;
                                    }}
                                />
                            </header>
                        </div>
                        {/* {AccessControl(AccessKeys.Students)?.edit === 1} */}
                        <button
                            className={profileClasses["action-btn"]}
                            onClick={() => {
                                update();
                            }}>
                            <AiFillSetting size={18} />
                            Update
                        </button>
                    </div>
                    <div className={profileClasses["card-data"]}>
                        <h4> Contact</h4>

                        {data.EmailID && (
                            <p>
                                {" "}
                                <GrMail color="#016997" size={18} />
                                <span>{data.EmailID}</span>
                            </p>
                        )}
                        {data.MobileNumber && (
                            <p>
                                {" "}
                                <FaPhone color="#016997" size={13} />
                                <span>{data.MobileNumber}</span>
                            </p>
                        )}
                    </div>
                </div>
                <div className={profileClasses["internal"]}>
                    <h3>Profile</h3>

                    <div>
                        <h3>Gender:</h3>
                        <p>{data.Gender}</p>
                    </div>
                    <div>
                        <h3>Age:</h3>
                        <p>{calculateAge(data.DOB)} </p>
                    </div>
                    <div>
                        <h3>Date Created:</h3>
                        <p>
                            <Moment format="DD/MM/YYYY">
                                {data.CreatedAt}
                            </Moment>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
