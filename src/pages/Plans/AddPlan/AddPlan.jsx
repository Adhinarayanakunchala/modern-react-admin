import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
window.Buffer = window.Buffer || require("buffer").Buffer;
function AddPlan() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const [base64, setbase64] = useState("");
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [mainLoad, setMainLoad] = useState(false);
    const Navigate = useNavigate();
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Plans")[0];

    useEffect(() => {
        if (filteredItems?.CanRead === 1 || filteredItems?.CanEdit === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    useEffect(() => {
        if (params.get("id")) {
            setEdit(true);
            Services.PlanById(
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
                        setCategoryDetails(response.PremiumPlan);
                        reset({
                            PlanName: response.PremiumPlan?.PlanName,
                            PlanType: response.PremiumPlan?.PlanType,
                            PlanDescription: response.PremiumPlan?.PlanDescription,
                            PlanCost: response.PremiumPlan?.PlanCost,
                            Validity: response.PremiumPlan?.Validity,
                            Credits: response.PremiumPlan?.Credits,
                            Priority: response.PremiumPlan?.Priority,
                            IsHighest: response.PremiumPlan?.IsHighest,
                            Status: response.PremiumPlan?.Status
                        });
                        // setbase64(response.Categories.CategoryImage);
                        setTimeout(() => {
                            setMainLoad(false);
                        }, 200);
                    } else if (response.Status === 0) {
                        warningSwal("Warning", response.Message);
                    }
                })
                .catch((err) => {
                    // alert(err);
                    alert("something went wrong please try again");
                    console.log(err);
                });
        }
        // eslint-disable-next-line
    }, []);
    useLayoutEffect(() => {
        if (params.get("id")) {
            setMainLoad(true);
        }
        // eslint-disable-next-line
    }, []);


    const onSubmit = (data) => {
        // setLoading(true);
        // console.log(getValues());
        if (edit) {
            let body = data;
            Services.EditPlan(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Plan Updated", response.Message);
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
            Services.AddPlan("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Plan Added", response.Message);
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
        }
    };


    const backButton = () => {
        Navigate(-1);
    };

    const subscriptionMonths = Array.from({ length: 12 }, (v, i) => ({
        id: i + 1,
        monthName: `${i + 1} month${i === 0 ? '' : 's'}`
    }));

    // console.log(subscriptionMonths);

    return (
        <Layout Active={"Plans"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Plan</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Plan" : "Update Plan"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                PlanName{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("PlanName", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.PlanName && (
                                <span>{errors.PlanName.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="PlanType">
                                PlanType{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("PlanType", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            >
                                <option value="">Select planType</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>

                            </select>
                            {errors.PlanType && (
                                <span>{errors.PlanType.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                PlanCost{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("PlanCost", {
                                    required: "this field is required",
                                    pattern: {
                                        valueAsNumber: true,
                                        pattern: {
                                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                            message: "Invalid PlanCost",
                                        }
                                    }
                                })}
                            />
                            {errors.PlanCost && (
                                <span>{errors.PlanCost.message}</span>
                            )}
                        </div>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Validity{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Validity", {
                                    required: "this field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">select Months</option>
                                {
                                    subscriptionMonths.map((month) => (
                                        <option key={month.id} value={month.id}>
                                            {month.monthName}
                                        </option>
                                    ))}
                            </select>

                            {errors.Validity && (
                                <span>{errors.Validity.message}</span>
                            )}
                        </div>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Credits{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("Credits", {
                                    required: "this field is required",
                                    pattern: {
                                        value: /^(?!0\d)(\d+(\.\d+)?|0\.\d+)$/,
                                        message: "Please enter Digits"
                                    }
                                })}
                            />
                            {errors.Credits && (
                                <span>{errors.Credits.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Priority">
                                Priority{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("Priority", {
                                    required: "this field is required",
                                    pattern: {
                                        valueAsNumber: true,
                                        value: /^[1-9][0-9]*$/,
                                        message: "Please enter Digits"
                                    }
                                })}
                            />
                            {errors.Priority && (
                                <span>{errors.Priority.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                IsHighest{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("IsHighest", {
                                    required: "this field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value={""}>Select Status</option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            {errors.IsHighest && (
                                <span>{errors.IsHighest.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Status">
                                Status{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Status", {
                                    required: "this field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value={""}>Select Status</option>
                                <option value={1}>Active</option>
                                <option value={2}>InActive</option>
                            </select>
                            {errors.Status && (
                                <span>{errors.Status.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["file-upload-wrapper"]}>
                            <header>
                                <h3>Description
                                </h3>
                            </header>
                            <Controller
                                name="PlanDescription"
                                control={control}
                                rules={{
                                    required: "This field is required",
                                    validate: (value) => value.trim() !== "",
                                }}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        className="addnew-quill"
                                        {...field}
                                    />
                                )}
                            />

                        </div>
                        {errors.PlanDescription && (
                            <span style={{ color: "red" }}>{errors.PlanDescription.message}</span>
                        )}
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

export default AddPlan;
