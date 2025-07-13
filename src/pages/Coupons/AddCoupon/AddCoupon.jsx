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
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
window.Buffer = window.Buffer || require("buffer").Buffer;

function AddCoupon() {
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const [edit, setEdit] = useState(false);
    const [base64, setbase64] = useState("");
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [mainLoad, setMainLoad] = useState(false);
    const Navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };
    const cupontype = watch("CouponType");
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Coupons")[0];

    useEffect(() => {
        if (filteredItems?.CanWrite === 1 || filteredItems?.CanEdit === 1) {
            return;
        } else {
            Navigate("/forbidden");
        }
    }, []);

    useEffect(() => {
        if (params.get("id")) {
            setEdit(true);
            Services.CouponById(
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
                        setCategoryDetails(response.Coupon);
                        reset({
                            CouponCode: response.Coupon.CouponCode,
                            StartDate: moment(response.Coupon.StartDate).format("YYYY-MM-DD"),
                            EndDate: moment(response.Coupon.EndDate).format("YYYY-MM-DD"),
                            CouponType: response.Coupon.CouponType,
                            Amount: response.Coupon.Amount,
                            MaxDiscount: response.Coupon.MaxDiscount,
                            Status: response.Coupon.Status,
                            Visible: response.Coupon.Visible,
                            UsageLimit: response.Coupon.UsageLimit,
                            Description: response.Coupon.Description,
                            Percentage: response.Coupon.Percentage
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
        }
    }, []);


    const onSubmit = (data) => {
        // setLoading(true);
        if (edit) {
            let body = data;


            Services.EditCoupon(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Coupon Updated", response.Message);
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
            Services.AddCoupon("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Coupon Added", response.Message);
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

    const startDate = watch("StartDate");

    const validateEndDate = (endDate) => {
        if (!endDate) return "This field is required";
        const end = new Date(endDate);
        const start = new Date(startDate);

        if (start && end <= start) {
            return "End date must be after start date";
        }

        if (end <= new Date()) {
            return "End date must be in the future";
        }

        return true;
    };

    const validateStartDate = (startDate) => {
        if (!startDate) return "This field is required";
        return true;
    };

    return (
        <Layout Active={"Coupons"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Coupon</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Coupon" : "Update Coupon"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Coupon Code{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("CouponCode", {
                                    required: "this field is required",
                                    validate: NullCheck,
                                })}
                            />
                            {errors.CouponCode && (
                                <span>{errors.CouponCode.message}</span>
                            )}
                        </div>

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Coupon Type{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("CouponType", {
                                    required: "this field is required",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">select CouponType</option>
                                <option value={1}>Amount</option>
                                <option value={2}>Percentage</option>
                            </select>
                            {errors.CouponType && (
                                <span>{errors.CouponType.message}</span>
                            )}
                        </div>

                        {
                            cupontype == "2" ?
                                <div className={TutorClasses["form-control"]}>
                                    <label htmlFor="Percentage">
                                        Percentage {" "}
                                        <span className="important">*</span>
                                    </label>
                                    <input
                                        {...register("Percentage", {
                                            required: "this field is required",
                                            pattern: {
                                                value: /^(?!0\d)(\d+(\.\d+)?|0\.\d+)$/,
                                                message: "Please Enter Digits"
                                            }
                                        })}
                                        maxLength={2}
                                    />
                                    {errors.Percentage && (
                                        <span>{errors.Percentage.message}</span>
                                    )}
                                </div> : <div className={TutorClasses["form-control"]}>
                                    <label htmlFor="First Name">
                                        Amount{" "}
                                        <span className="important">*</span>
                                    </label>
                                    <input
                                        {...register("Amount", {
                                            required: "this field is required",
                                            valueAsNumber: true,
                                            pattern: {
                                                value: /^(?!0\d)(\d+(\.\d+)?|0\.\d+)$/,
                                                message: "Please Enter Digits"
                                            }
                                        })}
                                    />
                                    {errors.Amount && (
                                        <span>{errors.Amount.message}</span>
                                    )}
                                </div>
                        }
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                UsageLimit{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("UsageLimit", {
                                    required: "this field is required",
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[1-9][0-9]*$/,
                                        message: "Please Enter Digits"
                                    }
                                })}
                            />
                            {errors.UsageLimit && (
                                <span>{errors.UsageLimit.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="MaxDiscount">
                                MaxDiscount{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                {...register("MaxDiscount", {
                                    required: "this field is required",
                                    valueAsNumber: true,
                                    pattern: {
                                        value: /^[1-9][0-9]*$/,
                                        message: "Please Enter Digits"
                                    }
                                })}
                            />
                            {errors.MaxDiscount && (
                                <span>{errors.MaxDiscount.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                StartDate{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                type="date"
                                {...register("StartDate", {
                                    required: "this field is required",

                                    validate: validateStartDate,
                                })}
                            />
                            {errors.StartDate && (
                                <span>{errors.StartDate.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                EndDate{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                type="date"
                                {...register("EndDate", {
                                    required: "this field is required",
                                    validate: validateEndDate,
                                })}
                            />
                            {errors.EndDate && (
                                <span>{errors.EndDate.message}</span>
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
                                    valueAsNumber: true,
                                })}
                            >
                                <option value={1}>Active</option>
                                <option value={2}>In Active</option>
                            </select>
                            {errors.CouponType && (
                                <span>{errors.CouponType.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="Visible">
                                Visible{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("Visible", {
                                    required: "this field is required",
                                    valueAsNumber: true,

                                })}
                            >
                                <option value={1}>YES</option>
                                <option value={0}>NO</option>
                            </select>
                            {errors.Visible && (
                                <span>{errors.Visible.message}</span>
                            )}
                        </div>
                        <div className={TutorClasses["file-upload-wrapper"]}>
                            <header>
                                <h3>Description
                                </h3>
                            </header>
                            <Controller
                                name="Description"
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
                        {errors.Description && (
                            <span style={{ color: "red" }}>{errors.Description.message}</span>
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

export default AddCoupon;
