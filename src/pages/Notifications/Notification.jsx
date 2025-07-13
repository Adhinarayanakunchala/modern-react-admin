
import React, { useEffect, useState } from 'react';
import CommanClasses from '../../Styles/Common.module.css';
import { useForm } from 'react-hook-form';
import { SuccessSwal, warningSwal } from 'Util/Toast';
import { Services } from 'Services';
import { NullCheck } from 'Components/validators';
import ReactLoading from "react-loading";
import { useNavigate } from 'react-router-dom';
const Notification = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Notifications")[0];

    useEffect(() => {
        if (filteredItems?.CanWrite === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);

    const getUsers = async () => {
        try {
            const res = await Services.Users("GET", null, token);
            if (res.Status === 1) {
                setUsers(res.Users);
            } else if (res.Status === 0) {
                warningSwal("Warning", res.Message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await Services.Sendnotifications("POST", JSON.stringify(data), token)
            if (res?.Status === 1) {
                setLoading(false);
                SuccessSwal("Notification Sent", res?.Message);
                reset({
                    UserID: "",
                    Title: "",
                    Message: ""
                })
            } else if (res?.Status === 0) {
                setLoading(false);
                warningSwal("Warning", res?.Message);
            };
        } catch (err) {
            setLoading(false);
            console.log(err);
        };
    };

    return (
        <div className={CommanClasses.formcontainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={CommanClasses["form-control"]}>
                    <label htmlFor="Title">
                        Title{" "}
                        <span className="important">*</span>
                    </label>
                    <input type='text'
                        {...register("Title", {
                            required: "this field is required",
                            validate: NullCheck,
                        })}
                    />
                    {errors.Title && (
                        <span>{errors.Title.message}</span>
                    )}
                </div>
                <div className={CommanClasses["form-control"]}>
                    <label htmlFor="Message">
                        Message{" "}
                        <span className="important">*</span>
                    </label>
                    <textarea type='text'
                        // rows={2}
                        // cols={2}
                        {...register("Message", {
                            required: "this field is required",
                            validate: NullCheck,
                        })}
                    />
                    {errors.Message && (
                        <span>{errors.Message.message}</span>
                    )}
                </div>
                <div className={CommanClasses["form-control"]}>
                    <label htmlFor="Id">
                        User{" "}
                        <span className="important">*</span>
                    </label>
                    <select
                        {...register("UserID", {
                            required: false,
                            valueAsNumber: false

                        })}
                    >
                        <option value="">select User</option>
                        <option value={"all"}>All users</option>
                        <option value={"premium"}>Premium</option>
                        <option value={"free"}>Free </option>
                        {
                            users.map((user) => (
                                <option key={user.UserID} value={user.UserID}>
                                    {user.UserName}
                                </option>
                            ))}

                    </select>
                    {errors.UserID && (
                        <span>{errors.UserID.message}</span>
                    )}
                </div>

                <button disabled={loading}>
                    {" "}
                    {loading ? (
                        <ReactLoading
                            color="green"
                            type="spokes"
                            height={30}
                            width={30}
                        />
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>

        </div>
    )
}

export default Notification