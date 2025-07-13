import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
import { Error } from '../../../Util/Toast'

function AddAccountforAdmin() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [mainLoad, setMainLoad] = useState(false);
    const Navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Admin Accounts")[0];


    useEffect(() => {
        if (filteredItems?.CanWrite === 1 || filteredItems?.CanEdit === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    useEffect(() => {
        fetchRoles();
    }, []);
    const fetchRoles = async () => {
        try {
            const res = await Services.Roles("GET", null, token);
            if (res?.Status === 1) {
                setRoles(res?.AdminRoles);
                console.log(res?.AdminRoles);
            } else if (res?.Status === 0) {
                Error(res?.Message);
            }
        } catch (err) {
            console.log(err);
            Error(err?.response?.data?.message);
        }
    }

    useEffect(() => {
        if (params.get("id")) {
            setEdit(true);
            Services.AdminAccountById(
                "GET",
                null,
                token,
                params.get("id")
            )
                .then((response) => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                    if (response.Status === 1) {
                        setCategoryDetails(response?.AdminUser);
                        let res = response?.AdminUser;
                        reset({
                            FirstName: res?.FirstName,
                            LastName: res?.LastName,
                            EmailID: res?.EmailID,
                            MobileNumber: res?.MobileNumber,
                            Status: res?.Status,
                            AdminRoleID: res?.AdminRoleID,
                            Password: res?.Password || null
                        });

                        setTimeout(() => {
                            setMainLoad(false);
                        }, 200);
                    } else if (response.Status === 0) {
                        warningSwal("Warning", response.Message);
                    }
                })

                .catch((err) => {
                    alert("something went wrong please try again");
                    console.log(err);
                });
        }

    }, []);

    useLayoutEffect(() => {
        if (params.get("id")) {
            setMainLoad(true);
        };
    }, []);


    const onSubmit = (data) => {
        setLoading(true);
        if (edit) {
            let body = data;
            Services.updateAdmin(
                "PATCH",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Religion Updated", response.Message);
                        Navigate(-1);
                    } else if (response.Status === 0) {
                        setLoading(false);
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    // alert(err);
                    setLoading(false);
                    alert("something went wrong please try again");
                    console.log(err);
                });

        } else {
            Services.createAdmin("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Religion Added", response.Message);
                    } else if (response.Status === 0) {
                        setLoading(false);
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    alert("something went wrong please try again");
                    console.log(err);
                });
        }
    };


    const backButton = () => {
        Navigate(-1);
    };
    return (
        <Layout Active={"Manage Admin"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Create"} Admin</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add new Admin" : "Update Admin"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                FirstName{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("FirstName", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.FirstName && (
                                <span>{errors.FirstName.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                LastName{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("LastName", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.LastName && (
                                <span>{errors.LastName.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                EmailID{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("EmailID", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.EmailID && (
                                <span>{errors.EmailID.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                MobileNumber{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("MobileNumber", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.MobileNumber && (
                                <span>{errors.MobileNumber.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Password{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                text="password"
                                {...register("Password", {
                                    required: edit === false ? "This field is required" : false,
                                    // validate: NullCheck,
                                })}
                            />
                            {errors.Password && (
                                <span>{errors.Password.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                AdminRoleID{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("AdminRoleID", {
                                    required: "this field is required",
                                    // validate: NullCheck,
                                })}
                            >
                                <option value="" selected>Select Role</option>
                                {roles?.map((role) => (
                                    <option key={role?.AdminRoleID} value={role?.AdminRoleID}>{role?.AdminRoleName}</option>
                                ))}
                            </select>
                            {errors.AdminRoleID && (
                                <span>{errors.AdminRoleID.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Status">
                                Status{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Status", {
                                    required: false,
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">Select Type</option>
                                <option value={1}>Active</option>
                                <option value={0}>InActive</option>
                            </select>
                            {errors.Status && (
                                <span>{errors.Status.message}</span>
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
            </div>
        </Layout>
    );
}

export default AddAccountforAdmin;
