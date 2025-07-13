import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../Components/Layout";
import TutorClasses from "./index.module.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import S3FileUpload from "react-s3";
import { config } from "../../../s3config";
import { FileUploader } from "react-drag-drop-files";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Services } from "../../../Services";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { NullCheck } from "../../../Components/validators";
import MainLoader from "../../../Components/loader/loader";
import { SuccessSwal, warningSwal } from "../../../Util/Toast";
window.Buffer = window.Buffer || require("buffer").Buffer;
function AddIncome() {
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
        watch,
        formState: { errors },
    } = useForm();
    const token = { Authorization: `token ${localStorage.getItem("token")}` };

    const isAbove = watch("IsAbove");
    const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
    const filteredItems = AccessItems.filter((item) => item.PageName === "Personal Information")[0];

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
            Services.IncomeById(
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
                        setCategoryDetails(response.IncomeById);
                        reset({
                            FromIncome: response.IncomeById.FromIncome,
                            ToIncome: response.IncomeById.ToIncome,
                            IsAbove: response.IncomeById.IsAbove
                        });

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


            Services.EditIncome(
                "PUT",
                JSON.stringify(body),
                token,
                params.get("id")
            )
                .then((response) => {
                    if (response.Status === 1) {
                        SuccessSwal("Income Updated", response.Message);
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
            Services.AddIncome("POST", JSON.stringify(data), token)
                .then((response) => {
                    if (response.Status === 1) {
                        Navigate(-1);
                        SuccessSwal("Income Added", response.Message);
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
    return (
        <Layout Active={"Income"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{edit ? "Update" : "Add"} Income</title>
            </Helmet>
            {mainLoad && <MainLoader />}
            <div className={TutorClasses["Container"]}>
                <button onClick={backButton} className={TutorClasses["back"]}>
                    Back
                </button>
                <div className={TutorClasses["wrapper"]}>
                    <h3>{!edit ? "Add Income" : "Update Income"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                FromIncome{" "}
                                <span className="important">*</span>
                            </label>
                            <input
                                placeholder="ex 100000"
                                {...register("FromIncome", {
                                    required: "this field is required",

                                    pattern: {
                                        valueAsNumber: true,
                                        pattern: /^[0-9]+$/,
                                        message: "Invalid Number"
                                    }
                                })}
                            />
                            {errors.FromIncome && (
                                <span>{errors.FromIncome.message}</span>
                            )}
                        </div>


                        {
                            isAbove == 0 && (
                                <div className={TutorClasses["form-control"]}>
                                    <label htmlFor="First Name">
                                        ToIncome{" "}
                                        <span className="important">*</span>
                                    </label>
                                    <input
                                        placeholder="ex 100000"
                                        {...register("ToIncome", {
                                            required: "this field is required",
                                            pattern: {
                                                valueAsNumber: true,
                                                pattern: /^[0-9]+$/,
                                                message: "Invalid Number"
                                            }
                                        })}
                                    />
                                    {errors.ToIncome && (
                                        <span>{errors.ToIncome.message}</span>
                                    )}
                                </div>
                            )
                        }

                        <div className={TutorClasses["form-control"]}>
                            <label htmlFor="First Name">
                                Is Above{" "}
                                <span className="important">*</span>
                            </label>
                            <select
                                {...register("IsAbove", {
                                    required: "this field is required",
                                    valueAsNumber: true,
                                    validate: NullCheck,
                                })}
                            >
                                <option value="">select Type</option>
                                <option value={0}> Less than 1 Crore</option>
                                <option value={1}>Above 1 Crore</option>
                            </select>
                            {errors.IsAbove && (
                                <span>{errors.IsAbove.message}</span>
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

export default AddIncome;
